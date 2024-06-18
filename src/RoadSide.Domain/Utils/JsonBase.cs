namespace RoadSide.Domain;

public abstract class JsonBaseEntity<T>: BaseEntity<T> where T: IEquatable<T>
{
    public Dictionary<string, object> AdditionalProperties { get; set; }
}