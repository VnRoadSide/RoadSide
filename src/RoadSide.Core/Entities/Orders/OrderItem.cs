using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using RoadSide.Domain;

namespace RoadSide.Core.Entities;

[Index(nameof(OrderItem.ProductId), IsUnique = false)]
public class OrderItem
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int OrderItemId { get; set; }
    public int Quantity { get; set; }
    
    public DateTimeOffset DateCreated { get; set; }
    
    [ForeignKey("Product")]
    public Guid ProductId { get; set; }
    public virtual Products Product { get; set; }
    
    [ForeignKey("Order")]
    public Guid OrderId { get; set; }
    public virtual Orders Order { get; set; }
    
    public OrderStatus OrderStatus { get; set; }
}