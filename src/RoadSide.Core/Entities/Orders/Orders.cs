using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoadSide.Core.Entities;

public class Orders
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public Guid OrderId { get; set; }
    public int TotalPrice { get; set; }
    
    [ForeignKey("User")]
    public Guid UserId { get; set; }
    public virtual User User { get; set; }
    
    public virtual ICollection<OrderItem> Items { get; set; }
}