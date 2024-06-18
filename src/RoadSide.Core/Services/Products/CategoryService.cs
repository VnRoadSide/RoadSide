using System.ComponentModel.DataAnnotations;
using AutoMapper;
using RoadSide.Domain;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;

namespace RoadSide.Core.Services.Products;

public class CategoryService : ICategoryService
{
    private readonly ICoreDbContext _context;
    private readonly IMapper _mapper;

    public CategoryService(IMapper mapper, ICoreDbContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async ValueTask<ICollection<Category>> GetAllAsync()
    {
        var entities = await _context.Categories.ToListAsync();
        return _mapper.Map<IList<Category>>(entities);
    }
    
    public async ValueTask<ICollection<Category>> GetByName(string name)
    {
        var entities = await _context.Categories.ToListAsync();
        var result = entities
            .Where(t => t.Name.ToLower().Trim().Contains(name.ToLower().Trim()))
            .ToList();
        return _mapper.Map<IList<Category>>(result);
    }

    public async ValueTask UpdateAsync(ICollection<Category> categories)
    {
        foreach (var category in categories)
        {
            var entity = await _context.Categories
                .FirstOrDefaultAsync(s => s.Id == category.Id);

            if (entity is null)
            {
                throw new ValidationException($"Invalid: {category.Name} is not existed.");
            }

            _context.Categories.Entry(entity).CurrentValues.SetValues(_mapper.Map<Entities.Category>(category));
            await _context.SaveChangesAsync();
        }
    }

    public async ValueTask AddAsync(Category category)
    {
        if (string.IsNullOrWhiteSpace(category.Name))
        {
            throw new ValidationException($"Invalid: {nameof(Category.Name)} should not be empty.");
        }

        _context.Categories.Add(_mapper.Map<Entities.Category>(category));
        await _context.SaveChangesAsync();
    }

    public async ValueTask Remove(string id)
    {
        var entities = await _context.Categories.ToListAsync();
        var result = entities.Find(t => t.Id.ToString() == id);
        if (result is null)
        {
            throw new ValidationException($"Invalid: {id} is not existed.");
        }

        _context.Categories.Remove(result);
        await _context.SaveChangesAsync();
    }
}