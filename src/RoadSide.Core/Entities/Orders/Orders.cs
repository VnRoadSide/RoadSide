using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RoadSide.Domain;

namespace RoadSide.Core.Entities;

public class Orders : IAuditing<Guid>
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public Guid OrderId { get; set; }
    public int TotalPrice { get; set; }
    
    [ForeignKey("User")]
    public Guid UserId { get; set; }
    public virtual User? User { get; set; }

    public virtual ICollection<OrderItem> Items { get; set; } = [];
    public OrderStatus OrderStatus { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime LastModifiedOn { get; set; }
    public Guid LastModifiedBy { get; set; }
}