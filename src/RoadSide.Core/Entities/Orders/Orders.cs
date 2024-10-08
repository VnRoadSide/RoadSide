using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RoadSide.Domain;
using RoadSide.Domain.Fx;

namespace RoadSide.Core.Entities;

public class Orders : IAuditing<Guid>
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public Guid Id { get; set; }
    public int TotalPrice { get; set; }
    public virtual ICollection<OrderItem> Items { get; set; } = [];
    public OrderStatus OrderStatus { get; set; }
    public DateTime LastModifiedOn { get; set; }
    public Guid LastModifiedBy { get; set; }
    public DateTime CreatedOn { get; set; }
    public Guid CreatedBy { get; set; }
    
    [ForeignKey(nameof(CreatedBy))]
    public virtual User User { get; set; }
}