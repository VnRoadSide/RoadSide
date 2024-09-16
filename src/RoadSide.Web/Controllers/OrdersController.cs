using Microsoft.AspNetCore.Authorization;
using RoadSide.Domain;
using Microsoft.AspNetCore.Mvc;
using RoadSide.Core.Services;
using RoadSide.Domain.Context;
using RoadSide.Web.DTO;

namespace RoadSide.Web.Controllers;

[ApiController]
[Route("api/orders")]
public class OrdersController : ControllerBase
{
    private readonly ILogger<OrdersController> _logger;
    private readonly IOrderService _ordersService;
    private readonly IAppUserContext _appUserContext;
    private readonly IUserService _userService;
    private readonly INotificationService _notificationService;

    public OrdersController(ILogger<OrdersController> logger, IOrderService ordersService, IAppUserContext appUserContext, IUserService userService, INotificationService notificationService)
    {
        _logger = logger;
        _ordersService = ordersService;
        _appUserContext = appUserContext;
        _userService = userService;
        _notificationService = notificationService;
    }
    
    private Notification OrderSuccess() => new()
    {
        IsPersonal = true,
        To = new User { Id = _appUserContext.UserId },
        Content = "Đơn hàng của bạn đã được đặt thành công! Cảm ơn bạn đã tin tưởng và mua sắm tại cửa hàng của chúng tôi. Chúng tôi sẽ liên hệ với bạn để giao hàng sớm nhất."
    };

    private Notification OrderFailed() => new()
    {
        IsPersonal = true,
        To = new User { Id = _appUserContext.UserId },
        Content = "Xin lỗi, đã xảy ra lỗi trong quá trình đặt hàng. Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ của chúng tôi để được giúp đỡ."
    };

    [Authorize]
    [HttpPost("checkout")]
    public async ValueTask<ActionResult<Guid>> CreateCheckoutSessionAsync([FromBody] ICollection<OrderItem> orderItems)
    {
        try
        {
            _logger.LogInformation($"Trigger {nameof(CreateCheckoutSessionAsync)}");
            var sessionId = await _ordersService.CreateCheckoutSessionAsync(orderItems);
            await _userService.AddSessionIdAsync(_appUserContext.UserId, sessionId.ToString());
            return Ok(sessionId);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [Authorize]
    [HttpGet("checkout/{sessionId}")]
    public async Task<ActionResult<ICollection<Orders>>> GetCheckoutSessionAsync(Guid sessionId)
    {
        try
        {
            if (!await _userService.ValidateSessionIdAsync(_appUserContext.UserId, sessionId.ToString()))
            {
                return NotFound("Session not found!");
            }
            var orderItems = await _ordersService.ValidateOrders(sessionId);

            return Ok(orderItems);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [Authorize]
    [HttpPost("{sessionId}")]
    public async ValueTask<ActionResult<StatusAction>> ProceedOrderAsync(Guid sessionId)
    {
        try
        {

            if (!await _userService.ValidateSessionIdAsync(_appUserContext.UserId, sessionId.ToString()))
            {
                return NotFound("Session not found!");
            }
            
            var orderItems = await _ordersService.ValidateOrders(sessionId);

            foreach (var order in orderItems)
            {
                order.User = new User
                {
                    Id = _appUserContext.UserId
                };
            }
            await _ordersService.BulkAddAsync(orderItems);
            await _userService.AddSessionIdAsync(_appUserContext.UserId);
            await _notificationService.AddAsync(OrderSuccess());
            return Ok(new StatusAction{ Success = true});
        }
        catch (Exception)
        {
            await _notificationService.AddAsync(OrderFailed());
            return Ok(new StatusAction{ Success = false});
        }
    }
    
    [HttpGet("portal")]
    public async ValueTask<ActionResult<ICollection<Orders>>> GetOrderForPortalAsync([FromQuery] int page, int pageSize)
    {
        try
        {
            var option = new QueryOrderOptions
            {
                Page = page,
                PageSize = pageSize,
                UserId = _appUserContext.User.Id
            };

            var orders = await _ordersService.GetForPortalAsync(option);
            return Ok(orders);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }


    [HttpGet]
    public async ValueTask<ActionResult<ICollection<Orders>>> GetAllOrdersAsync([FromQuery] int page, int pageSize)
    {
        try
        {
            var option = new QueryOrderOptions
            {
                Page = page,
                PageSize = pageSize,
                UserId = _appUserContext.User.Id
            };

            var orders = await _ordersService.GetAllAsync(option);
            return Ok(orders);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}