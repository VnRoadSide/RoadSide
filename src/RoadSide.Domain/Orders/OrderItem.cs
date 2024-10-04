namespace RoadSide.Domain;

public class OrderItem: BaseEntity<int>
{
    public int Quantity { get; set; }
    public Guid UserId { get; set; }
    public Products Product { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    public Orders Order { get; set; }
    public DateTime LastModifiedOn { get; set; } = DateTime.UtcNow;
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    public Guid LastModifiedBy { get; set; }
}
