using RoadSide.Domain;

namespace RoadSide.Web.DTO;

public class ProductDto: Products
{
    public int? DiscountedPrice { get; set; }
}