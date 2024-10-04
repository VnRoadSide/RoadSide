using System.Collections;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using RoadSide.Core.Extensions;
using RoadSide.Domain;
using RoadSide.Domain.Context;

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
    Task<Orders> ValidateOrders(Guid sessionId);
}

internal class OrderService(ICoreDbContext context, IMapper mapper, IProductService productService,  ICacheService cacheService, IAppContext appContext)
    : Service<Orders, Entities.Orders>(context, mapper), IOrderService
{
    private readonly ICoreDbContext _context = context;
    private readonly IMapper _mapper = mapper;

    public async Task<Guid> CreateCheckoutSessionAsync(ICollection<OrderItem> orderItem)
    {
        foreach (var item in orderItem)
        {
            item.Product = await productService.GetByIdAsync(item.Product.Id);
            item.UserId = appContext.UserId;
        }
        var sessionId = Guid.NewGuid();
        await cacheService.GetOrCreateAsync(sessionId.ToString(), () => Task.FromResult(orderItem.ToList()));
        return sessionId;
    }

    public async Task<ICollection<Orders>> GetAllAsync(QueryOrderOptions option)
    {
        var query = GetQueryable()
            .Where(order => order.UserId == option.UserId)
            .OrderByDescending(order => order.CreatedOn)
            .GetPaging(option)
            .Include(q => q.User)
            .AsNoTracking();
        query = query.Include(q => q.Items)
            .ThenInclude(q => q.Product)
            .ThenInclude(q => q.Vendor)
            .Include(q => q.Items)
            .ThenInclude(q => q.Product)
            .ThenInclude(q => q.Vouchers);
        return _mapper.Map<IList<Orders>>(await query.ToListAsync());
    }

    public async Task<ICollection<OrderItem>> GetForPortalAsync(QueryOrderOptions option)
    {
        var query = _context.Set<Entities.OrderItem>()
            .Include(o => o.Product)
            .Where(o => o.Product.VendorId == option.UserId)
            .AsNoTracking();
        
        return _mapper.Map<IList<OrderItem>>(await query.ToListAsync());
    }

    public async Task BulkAddAsync(ICollection<Orders> orders)
    {
        var entities = _mapper.Map<ICollection<Entities.Orders>>(orders);
        await DbSet.AddRangeAsync(entities);
        await _context.SaveChangesAsync();
    }

    public Task<Orders> ValidateOrders(Guid sessionId)
    {
        var orderItems = cacheService.Get<ICollection<OrderItem>>(sessionId.ToString());
        var order = new Orders {
            OrderStatus = OrderStatus.Pending,
            Items = orderItems.Select(o =>
            {
                o.LastModifiedBy = appContext.UserId;
                o.UserId = appContext.UserId;
                return o;
            }).ToList(),
            User = new User
            {
                Id = appContext.UserId
            },
            TotalPrice = orderItems.Sum(o => (o.Product.DiscountedPrice ?? o.Product.BaseUnitPrice)* o.Quantity)
        };
        return Task.FromResult(order);
    }
}