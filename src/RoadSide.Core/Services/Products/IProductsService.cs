namespace RoadSide.Core.Services.Products;

public interface IProductsService
{
    ValueTask<ICollection<RoadSide.Domain.Products>> GetAllAsync();
    ValueTask<RoadSide.Domain.Products?> GetById(string id);
    ValueTask<ICollection<(RoadSide.Domain.Products, int?)>> GetAllWithDiscount();
    ValueTask<(RoadSide.Domain.Products, int?)> GetByIdWithDiscount(string id);
    ValueTask<ICollection<RoadSide.Domain.Products>> GetByName(string name);
    ValueTask<ICollection<RoadSide.Domain.Products>> GetByCategory(int id);
    ValueTask UpdateAsync(ICollection<RoadSide.Domain.Products> products);
    ValueTask AddAsync(RoadSide.Domain.Products product);
    ValueTask Remove(string id);
}