using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;
using RoadSide.Domain;

namespace RoadSide.Core.Services;

public class QueryOrderOptions: QueryPaging
{
    public Guid UserId { get; set; }
}

public class SessionCheckout
{
    public Guid Id { get; set; }
    
}

public interface IOrderService : IService<Domain.Orders, Entities.Orders>
{
    Task<(Guid, List<Domain.Orders>)> CreateCheckoutSessionAsync(List<OrderItem> orderItem);
    Task<ICollection<Domain.Orders>> GetAllAsync(QueryOrderOptions option);
    Task<int> BulkAddAsync(List<Domain.Orders> orders);
}

internal class OrderService(ICoreDbContext context, IMapper mapper)
    : Service<Domain.Orders, Entities.Orders>(context, mapper), IOrderService
{
    public Task<(Guid, List<Domain.Orders>)> CreateCheckoutSessionAsync(List<OrderItem> orderItem)
    {
        // map order items by vendorid
        var items = orderItem.GroupBy(x => x.Product.Vendor).Select(x => new Domain.Orders
        {
            Items = x.ToList(),
            TotalPrice = x.Sum(data => data.Quantity * data.Product.BaseUnitPrice)
        });
        var sessionId = Guid.NewGuid();
        
        return Task.FromResult((sessionId, items.ToList()));
    }

    public async Task<ICollection<Domain.Orders>> GetAllAsync(QueryOrderOptions option)
    {
        var query = GetQueryable()
            .Where(order => order.UserId == option.UserId)
            .GetPaging(option)
            
            .Include(q => q.User)
            .AsNoTracking();
        query = query.Include(q => q.Items).ThenInclude(q => q.Product).ThenInclude(q => q.Vendor);
        return mapper.Map<IList<Domain.Orders>>(await query.ToListAsync());
    }

    public Task<int> BulkAddAsync(List<Domain.Orders> orders)
    {
        DbSet.AddRange(mapper.Map<ICollection<Entities.Orders>>(orders));
        return context.SaveChangesAsync();
    }
}