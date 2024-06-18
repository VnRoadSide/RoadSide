using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;

namespace RoadSide.Core.Services.Products;

public class ProductsService : IProductsService
{
    private readonly ICoreDbContext _context;
    private readonly IMapper _mapper;

    public ProductsService(ICoreDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async ValueTask<ICollection<RoadSide.Domain.Products>> GetAllAsync()
    {
        var entities = await _context.Products.Include(t => t.Vouchers).ToListAsync();
        return _mapper.Map<IList<RoadSide.Domain.Products>>(entities);
    }
    
    public async ValueTask<RoadSide.Domain.Products?> GetById(string id)
    {
        var entity = await _context.Products.Include(t => t.Vouchers)
            .FirstOrDefaultAsync(s => s.Id.ToString() == id);
        return _mapper.Map<RoadSide.Domain.Products>(entity);
    }

    private int? CalculateDiscount(RoadSide.Domain.Products product)
    {
        var activeVoucher = product.Vouchers
            .Where(v => v.Active && v.StartDate <= DateTimeOffset.UtcNow && v.EndDate >= DateTimeOffset.UtcNow)
            .MaxBy(v => v.Discount);

        return (activeVoucher != null)
            ? product.BaseUnitPrice * (100 - activeVoucher.Discount) / 100
            : null;
    }

    public async ValueTask<(RoadSide.Domain.Products, int?)> GetByIdWithDiscount(string id)
    {
        var product = await GetById(id);
        
        if (product == null)
        {
            throw new ValidationException($"Invalid: {id} is not existed.");
        }

        return (product, CalculateDiscount(product));
    }
    
    public async ValueTask<ICollection<(RoadSide.Domain.Products, int?)>> GetAllWithDiscount()
    {
        var products = await GetAllAsync();
        return products
            .Select(product => (product, CalculateDiscount(product)))
            .ToList();
    }

    public async ValueTask<ICollection<RoadSide.Domain.Products>> GetByName(string name)
    {
        var entities = await _context.Products.Include(t => t.Vouchers).ToListAsync();
        var result = entities
            .Where(t => t.Name.ToLower().Trim().Contains(name.ToLower().Trim()))
            .ToList();
        return _mapper.Map<IList<RoadSide.Domain.Products>>(result);
    }

    public async ValueTask<ICollection<RoadSide.Domain.Products>> GetByCategory(int id)
    {
        var entities = await _context.Products.Where(p => p.Category != null && p.Category.Id == id).ToListAsync();
        return _mapper.Map<IList<RoadSide.Domain.Products>>(entities);
    }

    public async ValueTask UpdateAsync(ICollection<RoadSide.Domain.Products> products)
    {
        foreach (var product in products)
        {
            var entity = await _context.Products
                .FirstOrDefaultAsync(s => s.Id == product.Id);

            if (entity is null)
            {
                throw new ValidationException($"Invalid: {product.Name} is not existed.");
            }

            _context.Products.Entry(entity).CurrentValues.SetValues(_mapper.Map<Entities.Products>(product));
            await _context.SaveChangesAsync();
        }
    }

    public async ValueTask AddAsync(RoadSide.Domain.Products product)
    {
        if (string.IsNullOrWhiteSpace(product.Name))
        {
            throw new ValidationException($"Invalid: {nameof(RoadSide.Domain.Products.Name)} should not be empty.");
        }

        _context.Products.Add(_mapper.Map<Entities.Products>(product));
        await _context.SaveChangesAsync();
    }

    public async ValueTask Remove(string id)
    {
        var entities = await _context.Products.ToListAsync();
        var result = entities.Find(t => t.Id.ToString() == id);
        if (result is null)
        {
            throw new ValidationException($"Invalid: {id} is not existed.");
        }

        _context.Products.Remove(result);
        await _context.SaveChangesAsync();
    }
}