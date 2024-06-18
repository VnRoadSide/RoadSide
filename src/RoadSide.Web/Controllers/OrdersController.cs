using System.ComponentModel.DataAnnotations;
using RoadSide.Core.Services.Orders;
using RoadSide.Domain;
using Microsoft.AspNetCore.Mvc;

namespace RoadSide.Web.Controllers;

[ApiController]
[Route("api/orders")]
public class OrdersController: ControllerBase
{
    private readonly ILogger<OrdersController> _logger;
    private readonly IOrdersService _ordersService;
    private readonly IVoucherService _voucherService;
    private readonly IOrderItemService _orderItemService;
    
    public OrdersController(ILogger<OrdersController> logger, IOrdersService ordersService, IVoucherService voucherService, IOrderItemService orderItemService) {
        _logger = logger;
        _ordersService = ordersService;
        _voucherService = voucherService;
        _orderItemService = orderItemService;
    }

    [HttpGet]
    public async ValueTask<IActionResult> GetAllOrdersAsync()
    {
        try
        {
            var orders = await _ordersService.GetAllAsync();
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

    [HttpGet("items")]
    public async ValueTask<IActionResult> GetOrderItems()
    {
        try
        {
            var orderItems = await _orderItemService.GetAllAsync();
            return Ok(orderItems);
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

    [HttpPost("update")]
    public async ValueTask<IActionResult> UpdateOrdersAsync([FromBody] ICollection<Orders> orders)
    {
        try
        {
            await _ordersService.UpdateAsync(orders);
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

    [HttpDelete]
    public async ValueTask<IActionResult> DeleteOrderAsync([Required] string id)
    {
        try
        {
            await _ordersService.Remove(id);
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