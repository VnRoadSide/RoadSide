namespace RoadSide.Domain.Context;

public interface IAppContext
{
    Guid UserId { get; }
    User User { get; }
    ICollection<OrderItem> Cart { get; }
    ICollection<Orders> Checkout { get; set; }
}