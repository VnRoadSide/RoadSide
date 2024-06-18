namespace RoadSide.Core.Services.Orders;

public interface IOrdersService
{
    ValueTask<ICollection<RoadSide.Domain.Orders>> GetAllAsync();
    ValueTask UpdateAsync(ICollection<RoadSide.Domain.Orders> orders);
    ValueTask AddAsync(RoadSide.Domain.Orders order);
    ValueTask Remove(string id);
}