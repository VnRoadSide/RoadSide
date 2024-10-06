using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;
using RoadSide.Domain;

namespace RoadSide.Core.Services;


public class CategoryQueryOption
{
    public bool FromBase { get; set; } = true;
    public bool Flatten { get; set; }
    public bool IsLeaf { get; set; }
}
public interface ICategoryService: IService<Category, Entities.Category>
{
    ValueTask<ICollection<Category>> GetAsync(CategoryQueryOption option);
    ValueTask<Category> GetByIdAsync(Guid id);
}
internal class CategoryService(ICoreDbContext context, IMapper mapper)
    : Service<Category, Entities.Category>(context, mapper), ICategoryService
{
    private readonly IMapper _mapper = mapper;

    public async ValueTask<ICollection<Category>> GetAsync(CategoryQueryOption option)
    {
        var query = GetQueryable()
            .Include(c => c.Categories)
            .AsNoTracking();
        if (option.FromBase)
        {
            query = query.Where(c => c.BaseCategoryId == null);
        }

        if (!option.Flatten)
        {
            query = query.Include(c => c.Categories);
        }
        
        if (option.IsLeaf)
        {
            query = query.Where(c => c.Categories.Count == 0);
        }

        return _mapper.Map<ICollection<Category>>(await query.ToListAsync());
    }

    public ValueTask<Category> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }
}