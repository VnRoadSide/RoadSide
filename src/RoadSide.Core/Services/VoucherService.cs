using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;
using RoadSide.Domain;

namespace RoadSide.Core.Services;

public class VoucherQueryOption : QueryPaging
{
    public bool ActiveOnly { get; set; }
}

public interface IVoucherService : IService<Domain.Voucher, Entities.Voucher>
{
    ValueTask<ICollection<Domain.Voucher>> GetAllAsync(VoucherQueryOption option);
}

internal class VoucherService(ICoreDbContext context, IMapper mapper)
    : Service<Domain.Voucher, Entities.Voucher>(context, mapper), IVoucherService
{

    public async ValueTask<ICollection<Voucher>> GetAllAsync(VoucherQueryOption option)
    {
        var query = GetQueryable();
        if (option.ActiveOnly)
        {
            query = query.Where(x => x.Active);
        }
        query = query
            .Include(x => x.AppliedProducts)
            .GetPaging(option);
        
        return mapper.Map<ICollection<Voucher>>(await query.ToListAsync());
    }
}