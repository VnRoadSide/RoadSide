
namespace RoadSide.Domain;

public class Orders: BaseEntity<Guid>
{
    public User User { get; set; }
    public ICollection<OrderItem> Items { get; set; }
    public int TotalPrice { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    public DateTime LastModifiedOn { get; set; }= DateTime.UtcNow;
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    public Guid LastModifiedBy { get; set; }
}