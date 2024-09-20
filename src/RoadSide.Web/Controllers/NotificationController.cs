using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RoadSide.Core.Extensions;
using RoadSide.Core.Services;
using RoadSide.Domain;
using RoadSide.Domain.Context;

namespace RoadSide.Web.Controllers;

[ApiController]
[Route("api/notification")]
public class NotificationController: ControllerBase
{
    private readonly ILogger<AppSettingsController> _logger;
    private readonly INotificationService _notificationService;
    private readonly IAppUserContext _appUserContext;

    public NotificationController(IAppUserContext appUserContext, INotificationService notificationService, ILogger<AppSettingsController> logger)
    {
        _appUserContext = appUserContext;
        _notificationService = notificationService;
        _logger = logger;
    }
    
    [Authorize]
    [HttpGet]
    public async ValueTask<ActionResult<PagingResult<Notification>>> GetNotification([FromQuery] int? page, int? pageSize)
    {
        try
        {
            var options = new QueryNotifications();
            options.Page = page ?? options.Page;
            options.PageSize = pageSize ?? options.PageSize;
            var result = await _notificationService.GetAllAsync(options);
            return Ok(result);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}