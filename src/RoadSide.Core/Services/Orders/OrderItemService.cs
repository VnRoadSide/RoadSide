using System.ComponentModel.DataAnnotations;
using AutoMapper;
using RoadSide.Domain;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;

namespace RoadSide.Core.Services.Orders;

public class OrderItemService: IOrderItemService
{
    private readonly ICoreDbContext _context;
    private readonly IMapper _mapper;

    public OrderItemService(ICoreDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async ValueTask<ICollection<OrderItem>> GetAllAsync()
    {
        var entities = await _context.OrderItems.ToListAsync();
        return _mapper.Map<IList<OrderItem>>(entities);
    }

    public async ValueTask UpdateAsync(ICollection<OrderItem> orderItems)
    {
        foreach (var orderItem in orderItems)
        {
            var entity = await _context.OrderItems
                .FirstOrDefaultAsync(s => s.OrderId.ToString() == orderItem.Id.ToString());

            if (entity is null)
            {
                throw new ValidationException($"Invalid: {orderItem.Id} is not existed.");
            }

            _context.OrderItems.Entry(entity).CurrentValues.SetValues(_mapper.Map<Entities.Orders>(orderItem));
            await _context.SaveChangesAsync();
        }
    }

    public async ValueTask AddAsync(OrderItem orderItem)
    {
        if (string.IsNullOrWhiteSpace(orderItem.Id.ToString()))
        {
            throw new ValidationException($"Invalid: {nameof(OrderItem.Id)} should not be empty.");
        }

        _context.OrderItems.Add(_mapper.Map<Entities.OrderItem>(orderItem));
        await _context.SaveChangesAsync();
    }

    public async ValueTask Remove(string id)
    {
        var entities = await _context.OrderItems.ToListAsync();
        var result = entities.Find(t => t.OrderId.ToString() == id);
        if (result is null)
        {
            throw new ValidationException($"Invalid: {id} is not existed.");
        }

        _context.OrderItems.Remove(result);
        await _context.SaveChangesAsync();
    }
}