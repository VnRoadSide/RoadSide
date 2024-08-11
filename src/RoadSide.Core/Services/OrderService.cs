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

public interface IOrderService : IService<Domain.Orders, Entities.Orders>
{
    Task<(Guid, List<Domain.Orders>)> CreateCheckoutSessionAsync(ICollection<OrderItem> orderItem);
    Task<ICollection<Domain.Orders>> GetAllAsync(QueryOrderOptions option);
    Task BulkAddAsync(List<Domain.Orders> orders);
    Task<List<Domain.Orders>> RevalidateOrders(object dataObject);
}

internal class OrderService(ICoreDbContext context, IMapper mapper, IProductService productService)
    : Service<Domain.Orders, Entities.Orders>(context, mapper), IOrderService
{
    public async Task<(Guid, List<Domain.Orders>)> CreateCheckoutSessionAsync(ICollection<OrderItem> orderItem)
    {
        foreach (var item in orderItem)
        {
            item.DateCreated = DateTimeOffset.Now;
            item.Product = await productService.GetByIdAsync(item.Product.Id);
        }
        
        // map order items by vendorid
        var items = orderItem.GroupBy(x => x.Product.Vendor).Select(x => new Domain.Orders
        {
            Items = x.ToList(),
            TotalPrice = x.Sum(data => data.Quantity * data.Product.BaseUnitPrice)
        });
        var sessionId = Guid.NewGuid();
        return (sessionId, items.ToList());
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

    public async Task BulkAddAsync(List<Domain.Orders> orders)
    {
        var entities = mapper.Map<ICollection<Entities.Orders>>(orders);
        
        await DbSet.AddRangeAsync(entities);

        await context.SaveChangesAsync();
    }

    public Task<List<Domain.Orders>> RevalidateOrders(object dataObject)
    {
        List<Domain.Orders> orderItems = [];

        var type = dataObject.GetType();
        if (!type.IsGenericType || type.GetGenericTypeDefinition() != typeof(List<>))
            return Task.FromResult(orderItems);
        var genericList = (IList)dataObject;
        foreach (var item in genericList)
        {
            if (item is JObject jObject)
            {
                // Process the order
                var order = jObject.ToObject<Domain.Orders>();
                if (order is not null)
                {
                    order.Items = order.Items.Select(i => new OrderItem
                    {
                        Product = i.Product,
                        Quantity = i.Quantity,
                    }).ToList();
                    orderItems.Add(order);
                }
            }
        }

        return Task.FromResult(orderItems);
    }
}