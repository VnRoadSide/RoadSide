using AutoMapper;
using RoadSide.Core.Extensions;

namespace RoadSide.Core.Services;

public interface IVoucherService : IService<Domain.Voucher, Entities.Voucher>;

internal class VoucherService(ICoreDbContext context, IMapper mapper)
    : Service<Domain.Voucher, Entities.Voucher>(context, mapper), IVoucherService;