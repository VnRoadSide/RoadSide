
namespace RoadSide.Domain;

public class Products: BaseModel<Guid>
{
    public int BaseUnitPrice { get; set; }

    public int? DiscountedPrice
    {
        get
        {
            var activeVoucher = Vouchers
                .Where(v => v.Active && v.StartDate <= DateTimeOffset.UtcNow && v.EndDate >= DateTimeOffset.UtcNow)
                .MaxBy(v => v.Discount);
            return (activeVoucher != null)
                ? BaseUnitPrice * (100 - activeVoucher.Discount) / 100
                : null;
        }
    }

    public string ImageUrl { get; set; } = string.Empty;
    public int SaleQuantity { get; set; }
    public int Rate { get; set; }
    public int InStockQuantity { get; set; }
    public string Unit { get; set; } = string.Empty;
    public Availability Availability { get; set; }
    public Category Category { get; set; }
    public User Vendor { get; set; }

    public ICollection<Voucher> Vouchers { get; set; } = [];

    // public IList<Variants> Variants { get; set; }
}