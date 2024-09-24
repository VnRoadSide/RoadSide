using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;
using RoadSide.Domain;
using RoadSide.Domain.Context;

namespace RoadSide.Core.Services;

public class ProductQueryOption : QueryPaging, IQueryFilter
{
    public bool IncludeCategory { get; set; }
    public string? CategoryUrl { get; set; }
    public string? Search { get; set; }
    public bool IsPortal { get; set; }
    public ICollection<(string, Sorting)> Filters { get; set; } = new List<(string, Sorting)>();
}

public interface IProductService : IService<Domain.Products, Entities.Products>
{
    ValueTask<PagingResult<Domain.Products>> GetAsync(ProductQueryOption option);
    ValueTask<Domain.Products> GetByIdAsync(Guid id);
}

internal class ProductService(ICoreDbContext context, IMapper mapper, IAppUserContext appUserContext)
    : Service<Domain.Products, Entities.Products>(context, mapper), IProductService
{
    private readonly IMapper _mapper = mapper;

    public async ValueTask<PagingResult<Domain.Products>> GetAsync(ProductQueryOption option)
    {
        var query = GetQueryable().GetFilter(option);

        if (option.IncludeCategory)
        {
            query = query
                .Include(x => x.Category);
            if (option.CategoryUrl is not null)
            {
                query = query.Where(x => x.Category != null && x.Category.Url == option.CategoryUrl);
            }
        }

        if (option.IsPortal)
        {
            query = query.Where(x => x.VendorId == appUserContext.User.Id);
        }

        query = query.Include(x => x.Vouchers);

        return new PagingResult<Domain.Products>
        {
            Total = query.Count(),
            Data = _mapper.Map<ICollection<Domain.Products>>(await query.ToListAsync()).Select(item =>
            {
                item.DiscountedPrice = CalculateDiscount(item);
                return item;
            }).ToList()
        };
    }

    public async ValueTask<Domain.Products> GetByIdAsync(Guid id)
    {
        var entity = await GetQueryable()
            .Include(x => x.Vouchers)
            .Include(x => x.Vendor)
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);
        var result = _mapper.Map<Domain.Products>(entity);
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