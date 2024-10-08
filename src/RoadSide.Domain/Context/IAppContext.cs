namespace RoadSide.Domain.Context;

public interface IAppContext
{
    Guid UserId { get; }
    ICollection<OrderItem> Cart { get; }
    ICollection<Orders> Checkout { get; set; }
}