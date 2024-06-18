
namespace RoadSide.Domain;

public class Orders: BaseEntity<Guid>
{
    public User User { get; set; }
    public List<OrderItem> Items { get; set; }
    public int TotalPrice { get; set; }
}