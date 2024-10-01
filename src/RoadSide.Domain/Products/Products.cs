
namespace RoadSide.Domain;

public class Products: BaseEntity<Guid>
{
    public string Name { get; set; }
    public string Description { get; set; }
    public int BaseUnitPrice { get; set; }
    public int? DiscountedPrice { get; set; }

    public DateTimeOffset DateCreated { get; set; }
    public DateTimeOffset DateModified { get; set; }
    public string ImageUrl { get; set; }
    public int Sale { get; set; }
    public int Rate { get; set; }
    public int Quantity { get; set; }
    public string Unit { get; set; } 
    public string Url { get; set; }
    public Category Category { get; set; }
    public User Vendor { get; set; }
    
    public ICollection<Voucher> Vouchers { get; set; }

    // public IList<Variants> Variants { get; set; }
}