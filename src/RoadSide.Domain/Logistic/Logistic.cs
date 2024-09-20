namespace RoadSide.Domain;

public class Logistic: JsonBaseEntity<Guid>
{
    public LogisticType LogisticType { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ApiKey { get; set; } = string.Empty; // be reference to appsettings
    public bool HasApi => !string.IsNullOrEmpty(ApiKey);
}