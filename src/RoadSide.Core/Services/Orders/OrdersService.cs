using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;

namespace RoadSide.Core.Services.Orders;

public class OrdersService : IOrdersService
{
    private readonly ICoreDbContext _context;
    private readonly IMapper _mapper;

    public OrdersService(ICoreDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }


    public async ValueTask<ICollection<RoadSide.Domain.Orders>> GetAllAsync()
    {
        var entities = await _context.Orders.ToListAsync();
        return _mapper.Map<IList<RoadSide.Domain.Orders>>(entities);
    }

    public async ValueTask UpdateAsync(ICollection<RoadSide.Domain.Orders> orders)
    {
        foreach (var order in orders)
        {
            var entity = await _context.Orders
                .FirstOrDefaultAsync(s => s.OrderId == order.Id);

            if (entity is null)
            {
                throw new ValidationException($"Invalid: {order.Id} is not existed.");
            }

            _context.Orders.Entry(entity).CurrentValues.SetValues(_mapper.Map<Entities.Orders>(order));
            await _context.SaveChangesAsync();
        }
    }

    public async ValueTask AddAsync(RoadSide.Domain.Orders order)
    {
        if (string.IsNullOrWhiteSpace(order.Id.ToString()))
        {
            throw new ValidationException($"Invalid: {nameof(RoadSide.Domain.Orders.Id)} should not be empty.");
        }

        _context.Orders.Add(_mapper.Map<Entities.Orders>(order));
        await _context.SaveChangesAsync();
    }

    public async ValueTask Remove(string id)
    {
        var entities = await _context.Orders.ToListAsync();
        var result = entities.Find(t => t.OrderId.ToString() == id);
        if (result is null)
        {
            throw new ValidationException($"Invalid: {id} is not existed.");
        }

        _context.Orders.Remove(result);
        await _context.SaveChangesAsync();
    }
}