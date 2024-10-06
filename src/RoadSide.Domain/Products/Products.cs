
namespace RoadSide.Domain;

public class Products: BaseModel<Guid>
{
    public int BaseUnitPrice { get; set; }
    public int? DiscountedPrice { get; set; }
    public string ImageUrl { get; set; }
    public int SaleQuantity { get; set; }
    public int Rate { get; set; }
    public int InStockQuantity { get; set; }
    public string Unit { get; set; } 
    public Availability Availability { get; set; }
    public Category Category { get; set; }
    public User Vendor { get; set; }

    public ICollection<Voucher> Vouchers { get; set; } = [];

    // public IList<Variants> Variants { get; set; }
}