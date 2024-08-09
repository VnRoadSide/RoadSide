using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;

namespace RoadSide.Core.Services;


public class CategoryQueryOption
{
    public bool FromBase { get; set; } = true;
    public bool Flatten { get; set; } = false;
}
public interface ICategoryService: IService<Domain.Category, Entities.Category>
{
    ValueTask<ICollection<Domain.Category>> GetAsync(CategoryQueryOption option);
    ValueTask<Domain.Category> GetByIdAsync(Guid id);
}
public class CategoryService(ICoreDbContext context, IMapper mapper)
    : Service<Domain.Category, Entities.Category>(context, mapper), ICategoryService
{
    public async ValueTask<ICollection<Domain.Category>> GetAsync(CategoryQueryOption option)
    {
        var query = GetQueryable();
        if (option.FromBase)
        {
            query = query.Where(c => c.BaseCategory == null);
        }

        if (!option.Flatten)
        {
            query = query.Include(c => c.Categories);
        }

        return mapper.Map<ICollection<Domain.Category>>(await query.ToListAsync());
    }

    public ValueTask<Domain.Category> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }
}