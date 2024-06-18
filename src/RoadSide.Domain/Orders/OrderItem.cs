namespace RoadSide.Domain;

public class OrderItem: BaseEntity<int>
{
    public int Quantity { get; set; }
    public DateTimeOffset DateCreated { get; set; }
    public Products Product { get; set; }
}