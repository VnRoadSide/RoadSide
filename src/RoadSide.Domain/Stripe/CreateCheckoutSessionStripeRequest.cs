namespace RoadSide.Domain.Stripe;

public record CreateCheckoutSessionStripeRequest
{
    public int Quantity { get; set; }
    public string ProductName { get; set; }
    public int Price { get; set; }
    public Guid UserId { get; set; }
}