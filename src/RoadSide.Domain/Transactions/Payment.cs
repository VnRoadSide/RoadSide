namespace RoadSide.Domain;

public class Payment: JsonBaseEntity<Guid>
{
    public PaymentMethod PaymentMethod { get; set; }
    public Orders Order { get; set; }
}