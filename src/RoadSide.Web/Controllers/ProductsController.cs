using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using RoadSide.Core.Services.Orders;
using RoadSide.Core.Services.Products;
using RoadSide.Domain;
using Microsoft.AspNetCore.Mvc;
using RoadSide.Web.DTO;

namespace RoadSide.Web.Controllers;

[ApiController]
[Route("api/products")]
public class ProductsController: ControllerBase
{
    private readonly ILogger<ProductsController> _logger;
    private readonly IProductsService _productsService;
    private readonly ICategoryService _categoryService;
    private readonly IPriceService _priceService;
    private readonly IVoucherService _voucherService;

    public ProductsController(ILogger<ProductsController> logger, IProductsService productsService,
        ICategoryService categoryService, IPriceService priceService, IVoucherService voucherService) {
        _logger = logger;
        _productsService = productsService;
        _categoryService = categoryService;
        _priceService = priceService;
        _voucherService = voucherService;
    }

    [HttpGet]
    public async Task<ActionResult<ICollection<Products>>> GetProducts()
    {
        try
        {
            var products = await _productsService.GetAllWithDiscount();
            var result = new List<ProductDto>();
            foreach (var (product, discountedPrice) in products)
            {
                result.Add(new ProductDto
                {
                    Id = product.Id,
                    Name = product.Name,
                    Description = product.Description,
                    BaseUnitPrice = product.BaseUnitPrice,
                    DateCreated = product.DateCreated,
                    DateModified = product.DateModified,
                    ImageUrl = product.ImageUrl,
                    Sale = product.Sale,
                    Rate = product.Rate,
                    Category = product.Category,
                    Vendor = product.Vendor,
                    Vouchers = product.Vouchers,
                    DiscountedPrice = discountedPrice
                });
            }
            
            return Ok(result);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    // [HttpGet]
    // [Authorize]
    // [Route("vendor")]
    // public async Task<ActionResult<ICollection<Products>>> GetProductByVendor()
    // {
    //     try
    //     {
    //         
    //     }
    //     catch (Exception)
    //     {
    //         return StatusCode(StatusCodes.Status500InternalServerError);
    //     }
    // }
    
    // [HttpGet("search")]
    // public async Task<ActionResult<ICollection<Products>>> SearchProducts([Required] string name)
    // {
    //     try
    //     {
    //         var products = await _productsService.GetByName(name);
    //         if (products.Count != 0) return Ok(products);
    //         var categories = await _categoryService.GetByName(name);
    //         var productsCollection = await Task.WhenAll(categories
    //             .Select(async c => await _productsService.GetByCategory(c.Id)));
    //         products = productsCollection.SelectMany(p => p).ToList();
    //
    //         return Ok(products);
    //     }
    //     catch (Exception)
    //     {
    //         return StatusCode(StatusCodes.Status500InternalServerError);
    //     }
    // }

    [HttpGet]
    [Route("{id}")] // api/products/{id}
    public async Task<ActionResult<ProductDto>> GetProductById(string id)
    {
        try
        {
            var (product, discountedPrice) = await _productsService.GetByIdWithDiscount(id);

            var result = new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                BaseUnitPrice = product.BaseUnitPrice,
                DateCreated = product.DateCreated,
                DateModified = product.DateModified,
                ImageUrl = product.ImageUrl,
                Sale = product.Sale,
                Rate = product.Rate,
                Category = product.Category,
                Vendor = product.Vendor,
                Vouchers = product.Vouchers,
                DiscountedPrice = discountedPrice
            };
            
            return Ok(result);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpGet("category")]
    public async Task<ActionResult<ICollection<Category>>> GetCategories()
    {
        try
        {
            var categories = await _categoryService.GetAllBaseAsync();
            return Ok(categories);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpGet("prices")]
    public async Task<ActionResult<ICollection<Prices>>> GetPrices()
    {
        try
        {
            var prices = await _priceService.GetAllAsync();
            return Ok(prices);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPost]
    public async ValueTask<IActionResult> AddNewProductAsync([FromBody] Products product)
    {
        try
        {
            await _productsService.AddAsync(product);
            return Ok();
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPost("update")]
    public async ValueTask<IActionResult> UpdateProductsAsync([FromBody] ICollection<Products> products)
    {
        try
        {
            await _productsService.UpdateAsync(products);
            return Ok();
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpDelete]
    public async ValueTask<IActionResult> DeleteProductAsync([Required] string id)
    {
        try
        {
            await _productsService.Remove(id);
            return Ok();
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpDelete("prices")]
    public async ValueTask<IActionResult> DeletePricesAsync([Required] string id)
    {
        try
        {
            await _priceService.Remove(id);
            return Ok();
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpDelete("categories")]
    public async ValueTask<IActionResult> DeleteCategoriesAsync([Required] string id)
    {
        try
        {
            await _categoryService.Remove(id);
            return Ok();
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
    
}