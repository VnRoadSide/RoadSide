using Microsoft.AspNetCore.Authorization;
using RoadSide.Domain;
using Microsoft.AspNetCore.Mvc;
using RoadSide.Core.Extensions;
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

    public OrdersController(ILogger<OrdersController> logger, IOrderService ordersService, IAppUserContext appUserContext, IUserService userService)
    {
        _logger = logger;
        _ordersService = ordersService;
        _appUserContext = appUserContext;
        _userService = userService;
    }

    [Authorize]
    [HttpPost("checkout")]
    public async ValueTask<ActionResult<Guid>> CreateCheckoutSessionAsync([FromBody] ICollection<OrderItem> orderItems)
    {
        try
        {
            var sessionId = await _ordersService.CreateCheckoutSessionAsync(orderItems);
            var user = _appUserContext.User;
            user.AdditionalProperties["CheckoutSessionId"] = sessionId;
            await _userService.UpdateAsync(user);

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
            var user = _appUserContext.User;
            Guid.TryParse(user.AdditionalProperties["CheckoutSessionId"].ToString(), out var parsedGuid);
            var orderItems = await _ordersService.ValidateOrders(parsedGuid);

            return Ok(orderItems);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [Authorize]
    [HttpPost("{sessionId}")]
    public async ValueTask<ActionResult<StatusAction>> ProceedOrderAsync(Guid? sessionId)
    {
        try
        {
            if (sessionId is null)
            {
                return BadRequest("Session id required!");
            }
            var user = _appUserContext.User;
            Guid.TryParse(user.AdditionalProperties["CheckoutSessionId"].ToString(), out var parsedGuid);
            if (parsedGuid != sessionId)
            {
                return NotFound();
            }
            
            var orderItems = await _ordersService.ValidateOrders(parsedGuid);

            foreach (var order in orderItems)
            {
                order.User = user;
            }

            await _ordersService.BulkAddAsync(orderItems);
            user.AdditionalProperties["Checkout"] = null;
            await _userService.UpdateAsync(user);
            return Ok(new StatusAction{ Success = true});
        }
        catch (Exception)
        {
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