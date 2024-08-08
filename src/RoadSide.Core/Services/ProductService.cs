using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;

namespace RoadSide.Core.Services;

public class ProductQueryOption : QueryPaging, IQueryFilter
{
    public bool IncludeCategory { get; set; }
    public string? Search { get; set; }
    public ICollection<(string, Sorting)> Filters { get; set; }
}

public interface IProductService: IService<Domain.Products, Entities.Products>
{
    ValueTask<ICollection<Domain.Products>> GetAsync(ProductQueryOption option);
    ValueTask<Domain.Products> GetByIdAsync(Guid id);
}

internal class ProductService(ICoreDbContext context, IMapper mapper)
    : Service<Domain.Products, Entities.Products>(context, mapper), IProductService
{
    public async ValueTask<ICollection<Domain.Products>> GetAsync(ProductQueryOption option)
    {
        var query = GetQueryable().GetFilter(option).GetPaging(option);

        if (option.IncludeCategory)
        {
            query = query
                .Include(x => x.Category);
        }
        
        return mapper.Map<IList<Domain.Products>>(await query.ToListAsync());
    }

    public async ValueTask<Domain.Products> GetByIdAsync(Guid id)
    {
        var result = await GetQueryable().FirstOrDefaultAsync(x => x.Id == id);
        ArgumentNullException.ThrowIfNull(result);
        return mapper.Map<Domain.Products>(result);
    }
}