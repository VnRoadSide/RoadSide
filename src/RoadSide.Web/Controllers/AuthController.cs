using System.ComponentModel.DataAnnotations;
using RoadSide.Core.Extensions;
using RoadSide.Domain;
using RoadSide.Infrastructure.Extensions;
using RoadSide.Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        public AuthController(IJwtService jwtService, ILogger<AuthController> logger, AppUserManager manager)
        {
            _jwtService = jwtService;
            _logger = logger;
            _manager = manager;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupInfo account)
        {
            try
            {   
                var user = new User {
                    UserName = account.UserName, 
                    Email = account.Email, 
                    Password = account.Password
                };
                var result = await _manager.CreateAsync(user);
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
            var account = await _manager.FindByNameAsync(info.UserName);
            if (account == null)
            {
                return Unauthorized("Invalid login attempt");
            }

            var result = await _manager.CheckPasswordSignInAsync(account, info.Password, lockoutOnFailure: true);
            if (result.Succeeded)
            {
                var token = await _jwtService.GenerateTokenFromUserName(account.UserName);
                return Ok(new { token.AccessToken, token.ExpiresIn });
            }

            return Unauthorized("Invalid login attempt");
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Implement logout logic if needed (e.g., invalidating tokens)
            return Ok("Logged out successfully");
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            var user = await _manager.GetUserAsync(User);
            var result = new CurrentUserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                RoleName = user.UserRoles.Select(t => t.Role.Name).ToList(),
                Name = user.FullName,
                PhoneNumber = user.PhoneNumber,
                Avatar = user.AvatarUrl
            };
            return Ok(result);
        }
    }
}
