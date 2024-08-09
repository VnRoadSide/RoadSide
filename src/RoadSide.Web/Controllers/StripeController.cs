
using RoadSide.Domain.Stripe;
using RoadSide.Infrastructure.Stripe;
using Microsoft.AspNetCore.Mvc;

namespace RoadSide.Web.Controllers;

[ApiController]
[Route("api/stripe")]
public class StripeController: ControllerBase
{
    private readonly ILogger<ProductsController> _logger;
    private readonly ICheckoutService _checkoutService;

    public StripeController(ICheckoutService checkoutService, ILogger<ProductsController> logger)
    {
        _checkoutService = checkoutService;
        _logger = logger;
    }

    [HttpPost("customer/add")]
    public async Task<ActionResult<StripeCustomer>> AddStripeCustomer([FromForm] AddStripeCustomer customer, CancellationToken ct)
    {
        try
        {
            StripeCustomer createdCustomer = await _checkoutService.AddStripeCustomerAsync(customer, ct);
            return Ok(createdCustomer);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("payment/add")]
    public async Task<ActionResult<StripePayment>> AddStripePayment([FromBody] AddStripePayment payment, CancellationToken ct)
    {
        try
        {
            StripePayment createdPayment = await _checkoutService.AddStripePaymentAsync(payment, ct);
            return Ok(createdPayment);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("create-checkout-session")]
    public IActionResult CreateCheckoutSession([FromBody] List<CreateCheckoutSessionStripeRequest> request)
    {
        string Url = _checkoutService.CreateCheckoutSession(request);
        return Ok(Url);
    }
}