namespace RoadSide.Domain;

public class Category: BaseModel<int>
{
    public Category BaseCategory { get; set; }
    public ICollection<Category> Categories { get; set; }
    public ICollection<Category> GetAllBases
    {
        get
        {
            var baseCategories = new List<Category>();
            var currentCategory = BaseCategory;
            while (currentCategory != null)
            {
                baseCategories.Add(currentCategory);
                currentCategory = currentCategory.BaseCategory;
            }
            return baseCategories;
        }
    }
}