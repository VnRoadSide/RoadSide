using System.ComponentModel.DataAnnotations.Schema;

namespace RoadSide.Core.Entities;

public class Category
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;
    public string Url { get; set; } = String.Empty;
    [ForeignKey("BaseCategory")]
    public int? BaseCategoryId { get; set; }
    public virtual Category? BaseCategory { get; set; }
    public virtual ICollection<Category> Categories { get; set; } = [];
}