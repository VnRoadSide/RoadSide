namespace RoadSide.Domain.Stripe;

public record AddStripeCard
(
    string Name,
    string CardNumber,
    string ExpirationYear,
    string ExpirationMonth,
    string Cvc
);