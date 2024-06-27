using System.ComponentModel.DataAnnotations;
using RoadSide.Core.Services.Users;
using RoadSide.Domain;
using Microsoft.AspNetCore.Mvc;
using RoadSide.Infrastructure.Identity;

namespace RoadSide.Web.Controllers;
[ApiController]
[Route("api/users")]
public class UsersController: ControllerBase
{
    private readonly ILogger<UsersController> _logger;
    private readonly IUsersService _usersService;
    private readonly AppUserManager _manager;


    public UsersController(ILogger<UsersController> logger, IUsersService usersService, AppUserManager manager) {
        _logger = logger;
        _usersService = usersService;
        _manager = manager;
    }

    [HttpGet]
    public async ValueTask<IActionResult> GetAllUsers(Guid roleId)
    {
        try
        {
            
            var users = await _usersService.GetAllAsync( new UserQueryOption
            {
                IncludeRole = false,
                RoleId = roleId
            });
            return Ok(users);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPost("update")]
    public async ValueTask<IActionResult> UpdateUser(ICollection<User> users)
    {
        try
        {
            await _usersService.UpdateAsync(users);
            return Ok();
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}