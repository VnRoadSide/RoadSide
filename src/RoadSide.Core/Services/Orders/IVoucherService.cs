using RoadSide.Domain;

namespace RoadSide.Core.Services.Orders;

public interface IVoucherService
{
    ValueTask<ICollection<Voucher>> GetAllAsync();
    ValueTask UpdateAsync(ICollection<Voucher> vouchers);
    ValueTask AddAsync(Voucher voucher);
    ValueTask Remove(string id);
}