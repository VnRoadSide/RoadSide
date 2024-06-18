using RoadSide.Domain;

namespace RoadSide.Core.Services.Orders;

public interface IOrderItemService
{
    ValueTask<ICollection<OrderItem>> GetAllAsync();
    ValueTask UpdateAsync(ICollection<OrderItem> orderItems);
    ValueTask AddAsync(OrderItem orderItem);
    ValueTask Remove(string id);
}