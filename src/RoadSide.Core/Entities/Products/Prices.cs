using System.ComponentModel.DataAnnotations.Schema;

namespace RoadSide.Core.Entities;

public class Prices
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public int UnitPrice { get; set; }
    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset EndDate { get; set; }
    
    [ForeignKey("Product")]
    public Guid ProductId { get; set; }
    public virtual Products? Product { get; set; }
}
