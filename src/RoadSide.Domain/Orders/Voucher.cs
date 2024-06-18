namespace RoadSide.Domain;

public class Voucher: BaseEntity<Guid>
{
    public string Code { get; set; }
    public string Description { get; set; }
    public int Discount { get; set; }
    
    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset EndDate { get; set; }
    public bool Active { get; set; }
    public int UsageLimit { get; set; }
    public List<Products> AppliedProducts { get; set; }
}