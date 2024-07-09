using RoadSide.Domain;

namespace RoadSide.Core.Services.Products;

public interface ICategoryService
{
    ValueTask<ICollection<Category>> GetAllBaseAsync();
    ValueTask<ICollection<Category>> GetByName(string name);
    ValueTask UpdateAsync(ICollection<Category> categories);
    
    ValueTask AddAsync(Category category);
    ValueTask Remove(string id);
}