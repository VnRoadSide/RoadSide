
using RoadSide.Domain.Fx;

namespace RoadSide.Domain;

public class Orders: BaseEntity<Guid>, IAuditing<Guid>
{
    public ICollection<OrderItem> Items { get; set; }
    public int TotalPrice { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    public DateTime LastModifiedOn { get; set; }= DateTime.UtcNow;
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    public Guid CreatedBy { get; set; }
    public Guid LastModifiedBy { get; set; }
}