using System.ComponentModel.DataAnnotations.Schema;

namespace RoadSide.Core.Entities;

public class Voucher
{
    [DatabaseGenerated((DatabaseGeneratedOption.Identity))]
    public Guid Id { get; set; }
    public string Code { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;
    public int Discount { get; set; }
    
    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset EndDate { get; set; }
    public bool Active { get; set; }
    public int UsageLimit { get; set; }
    public List<Products>? AppliedProducts { get; set; }
}