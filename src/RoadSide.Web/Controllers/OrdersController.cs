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
    private readonly IAppContext _appContext;
    private readonly IUserService _userService;
    private readonly INotificationService _notificationService;

    public OrdersController(ILogger<OrdersController> logger, IOrderService ordersService, IAppContext appContext, IUserService userService, INotificationService notificationService)
    {
        _logger = logger;
        _ordersService = ordersService;
        _appContext = appContext;
        _userService = userService;
        _notificationService = notificationService;
    }

    [Authorize]
    [HttpPost("checkout")]
    public async ValueTask<ActionResult<Guid>> CreateCheckoutSessionAsync([FromBody] ICollection<OrderItem> orderItems)
    {
        try
        {
            _logger.LogInformation($"Trigger {nameof(CreateCheckoutSessionAsync)}");
            var sessionId = await _ordersService.CreateCheckoutSessionAsync(orderItems);
            await _userService.AddOrUpdateSessionIdAsync(sessionId.ToString());
            return Ok(sessionId);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [Authorize]
    [HttpGet("checkout/{sessionId}")]
    public async Task<ActionResult<Orders>> GetCheckoutSessionAsync(Guid sessionId)
    {
        try
        {
            if (!await _userService.ValidateSessionIdAsync(sessionId.ToString()))
            {
                return NotFound("Session not found!");
            }
            var order = await _ordersService.ValidateOrders(sessionId);

            return Ok(order);
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
            if (!await _userService.ValidateSessionIdAsync(sessionId.ToString()))
            {
                return NotFound("Session not found!");
            }
        
            var order = await _ordersService.ValidateOrders(sessionId);
        
            await _ordersService.AddAsync(order);
            
            // Get the list of unique vendors from the orders
            var vendors = order.Items
                .Select(item => item.Product.Vendor)
                .DistinctBy(v => v.Id)
                .ToList();

            // Create notifications for each vendor
            var notifications = vendors.Select(vendor => new Notification
            {
                IsPersonal = false,
                To = vendor,
                Content = "Bạn có đơn hàng mới. Vui lòng kiểm tra đơn hàng của bạn."
            }).ToList();
            notifications.Add(new()
            {
                IsPersonal = true,
                To = new User { Id = _appContext.UserId },
                Content = "Đơn hàng của bạn đã được đặt thành công! Cảm ơn bạn đã tin tưởng và mua sắm tại cửa hàng của chúng tôi. Chúng tôi sẽ liên hệ với bạn để giao hàng sớm nhất."
            });

            // Send notifications to vendors
            await _notificationService.NotifyAsync(notifications);

            await _userService.AddOrUpdateSessionIdAsync();
            return Ok(new StatusAction { Success = true });
        }
        catch (Exception)
        {
            await _notificationService.AddAsync(new()
            {
                IsPersonal = true,
                To = new User { Id = _appContext.UserId },
                Content = "Xin lỗi, đã xảy ra lỗi trong quá trình đặt hàng. Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ của chúng tôi để được giúp đỡ."
            });
            return Ok(new StatusAction { Success = false });
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
                UserId = _appContext.User.Id
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
                UserId = _appContext.User.Id
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