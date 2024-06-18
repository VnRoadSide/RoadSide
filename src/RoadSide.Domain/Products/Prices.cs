namespace RoadSide.Domain;

public class Prices : BaseEntity<int>
{
    public int UnitPrice { get; set; }
    public Products Product { get; set; }
    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset EndDate { get; set; }
}