namespace RoadSide.Domain.Context;

public interface IAppUserContext
{
    User User { get; }
    List<OrderItem> Cart { get; }
    List<Orders> Checkout { get; set; }
}