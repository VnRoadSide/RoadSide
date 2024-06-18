using System.ComponentModel.DataAnnotations;
using AutoMapper;
using RoadSide.Domain;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;

namespace RoadSide.Core.Services.Products;

public class PricesService : IPriceService
{
    private readonly ICoreDbContext _context;
    private readonly IMapper _mapper;

    public PricesService(ICoreDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async ValueTask<ICollection<Prices>> GetAllAsync()
    {
        var entities = await _context.Prices.ToListAsync();
        return _mapper.Map<IList<Prices>>(entities);
    }

    public async ValueTask UpdateAsync(ICollection<Prices> prices)
    {
        foreach (var price in prices)
        {
            var entity = await _context.Prices
                .FirstOrDefaultAsync(s => s.Id == price.Id);

            if (entity is null)
            {
                throw new ValidationException($"Invalid: {price.Id} is not existed.");
            }

            _context.Prices.Entry(entity).CurrentValues.SetValues(_mapper.Map<Entities.Prices>(price));
            await _context.SaveChangesAsync();
        }
    }

    public async ValueTask AddAsync(Prices price)
    {
        if (string.IsNullOrWhiteSpace(price.Id.ToString()))
        {
            throw new ValidationException($"Invalid: {nameof(Prices.Id)} should not be empty.");
        }

        _context.Products.Add(_mapper.Map<Entities.Products>(price));
        await _context.SaveChangesAsync();
    }

    public async ValueTask Remove(string id)
    {
        var entities = await _context.Prices.ToListAsync();
        var result = entities.Find(t => t.Id.ToString() == id);
        if (result is null)
        {
            throw new ValidationException($"Invalid: {id} is not existed.");
        }

        _context.Prices.Remove(result);
        await _context.SaveChangesAsync();
    }
}