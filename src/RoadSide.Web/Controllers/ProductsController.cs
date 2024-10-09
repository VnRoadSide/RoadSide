using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using RoadSide.Domain;
using Microsoft.AspNetCore.Mvc;
using RoadSide.Core.Services;
using ICategoryService = RoadSide.Core.Services.ICategoryService;
namespace RoadSide.Web.Controllers;

[ApiController]
[Route("api")]
public class ProductsController: ControllerBase
{
    private readonly ILogger<ProductsController> _logger;
    private readonly IProductService _productService;
    private readonly ICategoryService _categoryService;
    private readonly ISearchProvider _searchProvider;
    private readonly IVoucherService _voucherService;

    public ProductsController(ILogger<ProductsController> logger, IProductService productService,
        ICategoryService categoryService, ISearchProvider searchProvider, IVoucherService voucherService) {
        _logger = logger;
        _productService = productService;
        _categoryService = categoryService;
        _searchProvider = searchProvider;
        _voucherService = voucherService;
    }

    [HttpGet]
    [Route("products")]
    [Route("products/{categoryUrl}")]
    public async Task<ActionResult<ICollection<Products>>> GetProducts(string? categoryUrl = null,string? search = null)
    {
        try
        {
            var option = new ProductQueryOption
            {
                IncludeCategory = true,
                CategoryUrl = categoryUrl,
                Search = search
            };
            
            var products = await _productService.GetAsync(option);
            await _searchProvider.ReIndexOperationsAsync(products.Data);
            return Ok(products);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpGet]
    [Authorize]
    [Route("portal/products")]
    public async Task<ActionResult<Paging<Products>>> GetProductInPortal([FromQuery] string category = null)
    {
        try
        {
            _logger.LogInformation("Trigger GetProductInPortal");
            var option = new ProductQueryOption
            {
                IncludeCategory = true,
                CategoryUrl = category,
                IsPortal = true
            };
            var products = await _productService.GetAsync(option);
            
            return Ok(products);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpDelete]
    [Authorize]
    [Route("portal/products")]
    public async Task<ActionResult> DeleteProductInPortal([FromQuery] Guid id)
    {
        try
        {
            _logger.LogInformation("Trigger DeleteProductInPortal");
            await _productService.RemoveAsync(id);
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
    [Route("detail/{id}")]
    public async Task<ActionResult<Products>> GetProductById(Guid id)
    {
        try
        {
            var result = await _productService.GetByIdAsync(id);
            return Ok(result);
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

    [HttpGet("category")]
    public async Task<ActionResult<ICollection<Category>>> GetCategories([FromQuery] bool? fromBase, bool? flatten, bool? isLeaf)
    {
        try
        {
            var option = new CategoryQueryOption();
            if (fromBase.HasValue)
            {
                option.FromBase = fromBase.Value;
            }
            if (flatten.HasValue)
            {
                option.Flatten = flatten.Value;
            }
            if (isLeaf.HasValue)
            {
                option.IsLeaf = isLeaf.Value;
            }
            var categories = await _categoryService.GetAsync(option);
            return Ok(categories);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPost]
    [Route("products")]
    public async ValueTask<IActionResult> AddNewProductAsync([FromBody] Products product)
    {
        try
        {
            await _productService.UpsertAsync(product);
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

    [HttpGet]
    [Route("voucher")]
    public async Task<ActionResult<ICollection<Voucher>>> GetVouchers()
    {
        try
        {
            var vouchers = await _voucherService.GetAllAsync(new VoucherQueryOption { ActiveOnly = true });
            return Ok(vouchers);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        } 
    }
}