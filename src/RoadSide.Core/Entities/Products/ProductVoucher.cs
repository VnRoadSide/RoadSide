using System.ComponentModel.DataAnnotations.Schema;

namespace RoadSide.Core.Entities;

public class ProductVoucher
{
    [ForeignKey(nameof(AppliedProducts))]
    public Guid AppliedProductsId { get; set; }
    public Products AppliedProducts { get; set; }

    [ForeignKey(nameof(Vouchers))]
    public Guid VouchersId { get; set; }
    public Voucher Vouchers { get; set; }
}
