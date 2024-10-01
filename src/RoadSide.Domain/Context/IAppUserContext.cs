namespace RoadSide.Domain.Context;

public interface IAppUserContext
{
    Guid UserId { get; }
    User User { get; }
    ICollection<OrderItem> Cart { get; }
    ICollection<Orders> Checkout { get; set; }
}