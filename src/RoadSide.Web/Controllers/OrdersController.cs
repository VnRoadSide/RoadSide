using System.ComponentModel.DataAnnotations;
using RoadSide.Core.Services.Orders;
using RoadSide.Domain;
using Microsoft.AspNetCore.Mvc;
using RoadSide.Core.Extensions;
using RoadSide.Core.Services;
using RoadSide.Core.Services.Products;

namespace RoadSide.Web.Controllers;

[ApiController]
[Route("api/orders")]
public class OrdersController: ControllerBase
{
    private readonly ILogger<OrdersController> _logger;
    private readonly IOrderService _ordersService;
    private readonly IProductService _productsService;
    private readonly IVoucherService _voucherService;
    private readonly IOrderItemService _orderItemService;
    private readonly IAppUserContext _appUserContext;
    private readonly IUserService _userService;
    
    public OrdersController(ILogger<OrdersController> logger, IOrderService ordersService, IVoucherService voucherService, IOrderItemService orderItemService, IProductService productsService, IAppUserContext appUserContext, IUserService userService) {
        _logger = logger;
        _ordersService = ordersService;
        _voucherService = voucherService;
        _orderItemService = orderItemService;
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
    
    [HttpPost("order/{sessionId}")]
    public async ValueTask<ActionResult> CreateCheckoutSessionAsync(Guid sessionId)
    {
        try
        {
            var user = _appUserContext.User;
            var orderItems = user.AdditionalProperties["Checkout"] as List<Orders>;
            if (orderItems is null)
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
    public async ValueTask<ActionResult<ICollection<Orders>>> GetAllOrdersAsync([FromBody] QueryPaging paging)
    {
        try
        {
            var option = new QueryOrderOptions
            {
                Page = paging.Page,
                PageSize = paging.PageSize,
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

    [HttpGet("voucher")]
    public async ValueTask<ActionResult<ICollection<Voucher>>> GetVoucher()
    {
        try
        {
            var voucher = await _voucherService.GetAllAsync();
            return Ok(voucher);
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

    [HttpDelete("voucher")]
    public async ValueTask<IActionResult> DeleteVoucherAsync([Required] string id)
    {
        try
        {
            await _voucherService.Remove(id);
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

    [HttpDelete("items")]
    public async ValueTask<IActionResult> DeleteOrderItemsAsync([Required] string id)
    {
        try
        {
            await _orderItemService.Remove(id);
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