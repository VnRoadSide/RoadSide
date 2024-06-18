namespace RoadSide.Domain;

public class Category: BaseEntity<int>
{
    public string Name { get; set; }
    public string Description { get; set; }
    public Category BaseCategory { get; set; } = null;
}