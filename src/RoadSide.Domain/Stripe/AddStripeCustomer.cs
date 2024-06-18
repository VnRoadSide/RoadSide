namespace RoadSide.Domain.Stripe;

public record AddStripeCustomer
(
    string Email,
    string Name,
    AddStripeCard CreditCard
);