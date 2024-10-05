namespace RoadSide.Domain;

public abstract class BaseModel<T> : BaseEntity<T> where T: IEquatable<T>
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string Url { get; set; }
    public DateTimeOffset DateCreated { get; set; }
    public DateTimeOffset DateModified { get; set; }
}
