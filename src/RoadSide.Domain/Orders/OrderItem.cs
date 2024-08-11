namespace RoadSide.Domain;

public class OrderItem: BaseEntity<int>
{
    public int Quantity { get; set; }
    public DateTimeOffset DateCreated { get; set; } = DateTime.UtcNow;
    public Products Product { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    public Orders Order { get; set; }
}