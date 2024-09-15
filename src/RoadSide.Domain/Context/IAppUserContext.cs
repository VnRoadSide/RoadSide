namespace RoadSide.Domain.Context;

public interface IAppUserContext
{
    Guid UserId { get; }
    User User { get; }
    List<OrderItem> Cart { get; }
    List<Orders> Checkout { get; set; }
}