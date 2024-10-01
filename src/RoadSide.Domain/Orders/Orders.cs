
namespace RoadSide.Domain;

public class Orders: BaseEntity<Guid>
{
    public User User { get; set; }
    public ICollection<OrderItem> Items { get; set; }
    public int TotalPrice { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
}