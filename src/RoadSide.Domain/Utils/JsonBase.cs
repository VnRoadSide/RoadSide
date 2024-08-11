using Newtonsoft.Json;

namespace RoadSide.Domain;

public abstract class JsonBaseEntity<T>: BaseEntity<T> where T: IEquatable<T>
{
    [JsonConverter(typeof(AdditionalPropertiesConverter))]
    public Dictionary<string, object> AdditionalProperties { get; set; } = new();
}