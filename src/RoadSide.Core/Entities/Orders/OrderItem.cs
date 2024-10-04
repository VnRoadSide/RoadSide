using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using RoadSide.Domain;

namespace RoadSide.Core.Entities;

[Index(nameof(OrderItem.ProductId), IsUnique = false)]
public class OrderItem: IAuditing<Guid>
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int OrderItemId { get; set; }
    public int Quantity { get; set; }
    
    [ForeignKey("Product")]
    public Guid ProductId { get; set; }
    public virtual required Products Product { get; set; }
    
    [ForeignKey("Order")]
    public Guid OrderId { get; set; }
    public virtual Orders Order { get; set; }
    
    public OrderStatus OrderStatus { get; set; }
    public DateTime CreatedOn { get; set; }
    public Guid UserId { get; set; }
    public DateTime LastModifiedOn { get; set; }
    public Guid LastModifiedBy { get; set; }
}