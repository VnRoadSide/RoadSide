using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;

namespace RoadSide.Core.Services;

public class ProductQueryOption : QueryPaging, IQueryFilter
{
    public bool IncludeCategory { get; set; }
    public string? CategoryUrl { get; set; }
    public string? Search { get; set; }
    public ICollection<(string, Sorting)> Filters { get; set; } = new List<(string, Sorting)>();
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
            if (option.CategoryUrl is not null)
            {
                query = query.Where(x => x.Category != null && x.Category.Url == option.CategoryUrl);
            }
        }

        var result = mapper.Map<IList<Domain.Products>>(await query.ToListAsync());
        foreach (var item in result)
        {
            item.DiscountedPrice = CalculateDiscount(item);
        }
        
        return result;
    }

    public async ValueTask<Domain.Products> GetByIdAsync(Guid id)
    {
        var entity = await GetQueryable().AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        ArgumentNullException.ThrowIfNull(entity);
        var result = mapper.Map<Domain.Products>(entity);
        result.DiscountedPrice = CalculateDiscount(result);
        return result;
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
}