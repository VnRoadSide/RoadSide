using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoadSide.Core.Entities;

public class Products
{
    [Key]
    [DatabaseGenerated((DatabaseGeneratedOption.Identity))]
    public Guid Id { get; set; }
    public string Name { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;
    public int BaseUnitPrice { get; set; }
    public DateTimeOffset DateCreated { get; set; }
    public DateTimeOffset DateModified { get; set; }
    public string ImageUrl { get; set; } = String.Empty;
    public int Sale { get; set; }
    public int Rate { get; set; }
    public string Url { get; set; } = String.Empty;
    [ForeignKey("Category")]
    public int CategoryId { get; set; }
    public virtual Category? Category { get; set; }
    [ForeignKey("Vendor")]
    public Guid VendorId { get; set; }
    public virtual User? Vendor { get; set; }
    public virtual ICollection<Voucher>? Vouchers { get; set; }

    // public IList<Variants> Variants { get; set; }
}