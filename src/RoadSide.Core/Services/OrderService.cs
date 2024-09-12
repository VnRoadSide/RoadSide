using System.Collections;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
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

public interface IOrderService : IService<Orders, Entities.Orders>
{
    Task<Guid> CreateCheckoutSessionAsync(ICollection<OrderItem> orderItem);
    Task<ICollection<Orders>> GetAllAsync(QueryOrderOptions option);
    Task<ICollection<OrderItem>> GetForPortalAsync(QueryOrderOptions option);

    Task BulkAddAsync(ICollection<Orders> orders);
    Task<ICollection<Orders>> ValidateOrders(Guid sessionId);
}

internal class OrderService(ICoreDbContext context, IMapper mapper, IProductService productService,  ICacheService cacheService)
    : Service<Orders, Entities.Orders>(context, mapper), IOrderService
{
    public async Task<Guid> CreateCheckoutSessionAsync(ICollection<OrderItem> orderItem)
    {
        foreach (var item in orderItem)
        {
            item.DateCreated = DateTimeOffset.Now;
            item.Product = await productService.GetByIdAsync(item.Product.Id);
        }
        
        // map order items by vendorid
        var items = orderItem.GroupBy(x => x.Product.Vendor).Select(x => new Orders
        {
            Items = x.ToList(),
            TotalPrice = x.Sum(data => data.Quantity * data.Product.BaseUnitPrice)
        });
        var sessionId = Guid.NewGuid();
        await cacheService.GetOrCreateAsync(sessionId.ToString(), () => Task.FromResult(items.ToList()));
        return sessionId;
    }

    public async Task<ICollection<Orders>> GetAllAsync(QueryOrderOptions option)
    {
        var query = GetQueryable()
            .Where(order => order.UserId == option.UserId)
            .GetPaging(option)
            
            .Include(q => q.User)
            .AsNoTracking();
        query = query.Include(q => q.Items).ThenInclude(q => q.Product).ThenInclude(q => q.Vendor);
        return mapper.Map<IList<Orders>>(await query.ToListAsync());
    }

    public async Task<ICollection<OrderItem>> GetForPortalAsync(QueryOrderOptions option)
    {
        var query = context.Set<Entities.OrderItem>()
            .Include(o => o.Product)
            .Where(o => o.Product.VendorId == option.UserId)
            .AsNoTracking();
        
        return mapper.Map<IList<OrderItem>>(await query.ToListAsync());
    }

    public async Task BulkAddAsync(ICollection<Orders> orders)
    {
        var entities = mapper.Map<ICollection<Entities.Orders>>(orders);
        
        await DbSet.AddRangeAsync(entities);

        await context.SaveChangesAsync();
    }

    public Task<ICollection<Orders>> ValidateOrders(Guid sessionId)
    {
        var orders = cacheService.Get<ICollection<Orders>>(sessionId.ToString());
        return Task.FromResult(orders);
    }
}