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

public interface IProductService : IService<Products, Entities.Products>
{
    ValueTask<Paging<Products>> GetAsync(ProductQueryOption option);
    ValueTask<Products> GetByIdAsync(Guid id);

    new ValueTask<Products> UpsertAsync(Products domain, CancellationToken cancellationToken = default);
}

internal class ProductService(ICoreDbContext context, IMapper mapper, IAppContext appContext)
    : Service<Products, Entities.Products>(context, mapper), IProductService
{
    private readonly IMapper _mapper = mapper;

    private ICollection<string> GetAllBaseUrls(Category category)
    {
        var baseUrls = new List<string>();
        var currentCategory = category;
        while (currentCategory != null)
        {
            baseUrls.Add(currentCategory.Url);
            currentCategory = currentCategory.BaseCategory;
        }
        return baseUrls;
    }
    public async ValueTask<Paging<Products>> GetAsync(ProductQueryOption option)
    {
        var query = GetQueryable().GetFilter(option);
        if (option.IsPortal)
        {
            query = query.Where(x => x.VendorId == appContext.User.Id);
        }
        
        if (option.IncludeCategory)
        {
            query = query
                .Include(x => x.Category)
                .ThenInclude(x => x.BaseCategory);
        }
        
        query = query.Include(x => x.Vouchers);
        var data = _mapper.Map<ICollection<Products>>(await query.ToListAsync());
        var total = query.Count();
        
        if (option.CategoryUrl is not null)
        {
            data = data.Where(x => GetAllBaseUrls(x.Category).Contains(option.CategoryUrl)).ToList();
            total = data.Count;
        }

        return new Paging<Products>
        {
            Total = total,
            Data = data
        };
    }

    public async ValueTask<Products> GetByIdAsync(Guid id)
    {
        var entity = await GetQueryable()
            .Include(x => x.Vouchers)
            .Include(x => x.Vendor)
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);
        var result = _mapper.Map<Products>(entity);
        return result;
    }
    
    public new async ValueTask<Products> UpsertAsync(Products domain, CancellationToken cancellationToken = default)
    {
        domain.Vendor = new User { Id = appContext.User.Id };
        return await base.UpsertAsync(domain, cancellationToken);
    }
}