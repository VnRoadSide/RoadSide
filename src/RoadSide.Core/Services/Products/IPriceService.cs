using RoadSide.Domain;

namespace RoadSide.Core.Services.Products;

public interface IPriceService
{
    ValueTask<ICollection<Prices>> GetAllAsync();
    ValueTask UpdateAsync(ICollection<Prices> prices);
    ValueTask AddAsync(Prices price);
    ValueTask Remove(string id);
}