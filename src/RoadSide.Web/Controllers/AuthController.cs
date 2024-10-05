using System.ComponentModel.DataAnnotations;
using RoadSide.Core.Extensions;
using RoadSide.Domain;
using RoadSide.Infrastructure.Extensions;
using RoadSide.Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RoadSide.Domain.Context;
using RoadSide.Web.DTO;

namespace RoadSide.Web.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IJwtService _jwtService;
        private readonly ILogger<AuthController> _logger;
        private readonly AppUserManager _manager;
        private readonly IAppContext _appContext;
        public AuthController(IJwtService jwtService, ILogger<AuthController> logger, AppUserManager manager, IAppContext appContext)
        {
            _jwtService = jwtService;
            _logger = logger;
            _manager = manager;
            _appContext = appContext;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupInfo account)
        {
            try
            {   
                var user = new User {
                    UserName = account.UserName, 
                    Email = account.Email
                };
                var result = await _manager.CreateAsync(user, account.Password);
                if (result.Succeeded)
                {
                    var token = await _jwtService.GenerateTokenAsyncUser(user);
                    return Ok(new { token.AccessToken, token.ExpiresIn });
                }
                return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Signup failed");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([Required] LoginInfo info)
        {
            try
            {
                var (result, user) = await _manager.CheckPasswordSignInAsync(info, lockoutOnFailure: true);
                if (result.Succeeded)
                {
                    var token = await _jwtService.GenerateTokenFromUserName(user.UserName);
                    return Ok(new { token.AccessToken, token.ExpiresIn, Profile = user });
                }

                return Unauthorized("Invalid login attempt");
            }
            catch (Exception)
            {
                return Unauthorized("Invalid login attempt");
            }
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<ActionResult<bool>> Logout()
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "").Trim();

            if (string.IsNullOrEmpty(token))
            {
                return BadRequest("No token provided.");
            }

            await _jwtService.RevokeTokenAsync(token);

            return Ok("Logged out successfully.");
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<CurrentUser>> Me()
        {
            var user = await _manager.GetDomainUserAsync(User);
            var result = new CurrentUser
            {
                Id = user!.Id,
                UserName = user.UserName,
                Email = user.Email,
                RoleName = user.Roles.Select(t => t.Name).ToList(),
                Name = user.FullName,
                PhoneNumber = user.PhoneNumber,
                Avatar = user.AvatarUrl
            };
            return Ok(result);
        }
    }
}
