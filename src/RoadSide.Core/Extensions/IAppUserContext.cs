using RoadSide.Domain;

namespace RoadSide.Core.Extensions;

public interface IAppUserContext
{
    User User { get; }
    List<OrderItem> Cart { get; }
}