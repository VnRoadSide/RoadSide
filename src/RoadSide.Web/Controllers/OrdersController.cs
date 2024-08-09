using System.ComponentModel.DataAnnotations;
using RoadSide.Core.Services.Orders;
using RoadSide.Domain;
using Microsoft.AspNetCore.Mvc;
using RoadSide.Core.Extensions;
using RoadSide.Core.Services;

namespace RoadSide.Web.Controllers;

[ApiController]
[Route("api/orders")]
public class OrdersController: ControllerBase
{
    private readonly ILogger<OrdersController> _logger;
    private readonly IOrderService _ordersService;
    private readonly IProductService _productsService;
    private readonly IAppUserContext _appUserContext;
    private readonly IUserService _userService;
    
    public OrdersController(ILogger<OrdersController> logger, IOrderService ordersService, IProductService productsService, IAppUserContext appUserContext, IUserService userService) {
        _logger = logger;
        _ordersService = ordersService;
        _productsService = productsService;
        _appUserContext = appUserContext;
        _userService = userService;
    }
    
    [HttpPost("checkout")]
    public async ValueTask<ActionResult<Guid>> CreateCheckoutSessionAsync([FromBody] ICollection<OrderItem> orderItems)
    {
        try
        {
            var processedItems = await Task.WhenAll(
                orderItems
                .Select(async item => new OrderItem
                {
                    Product = await _productsService.GetByIdAsync(item.Product.Id),
                    Quantity = item.Quantity,
                    DateCreated = DateTime.UtcNow
                })
            );
            
            var (sessionId, ordersList) = await _ordersService.CreateCheckoutSessionAsync(processedItems.ToList());
            var user = _appUserContext.User;
            user.AdditionalProperties["Checkout"] = ordersList;
            user.AdditionalProperties["CheckoutSessionId"] = sessionId;
            await _userService.UpdateAsync(user);
            
            return Ok(sessionId);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
    
    [HttpGet("checkout/{sessionId}/get")]
    public ActionResult<ICollection<Orders>> GetCheckoutSessionAsync(Guid sessionId)
    {
        try
        {
            var user = _appUserContext.User;
            var orderItems = user.AdditionalProperties["Checkout"] as List<Orders>;
            if (orderItems is null || (user.AdditionalProperties["CheckoutSessionId"] as Guid? ?? default) != sessionId)
            {
                return NotFound();
            }

            return Ok(orderItems);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
    
    [HttpPost("checkout/{sessionId}/proceed")]
    public async ValueTask<ActionResult> ProceedOrderAsync(Guid sessionId)
    {
        try
        {
            var user = _appUserContext.User;
            var orderItems = user.AdditionalProperties["Checkout"] as List<Orders>;
            if (orderItems is null || (user.AdditionalProperties["CheckoutSessionId"] as Guid? ?? default) != sessionId)
            {
                return NotFound();
            }
            
            await _ordersService.BulkAddAsync(orderItems);
            user.AdditionalProperties["Checkout"] = null;
            user.AdditionalProperties["CheckoutSessionId"] = null;
            await _userService.UpdateAsync(user);
            return Ok();
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
    
    [HttpPost]
    public async ValueTask<IActionResult> AddNewOrderAsync([FromBody] Orders order)
    {
        try
        {
            await _ordersService.AddAsync(order);
            return Ok();
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
    
}