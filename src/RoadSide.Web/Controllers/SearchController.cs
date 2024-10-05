using Microsoft.AspNetCore.Mvc;
using RoadSide.Core.Services;
using RoadSide.Domain;

namespace RoadSide.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SearchController(ISearchProvider searchProvider) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Search([FromQuery] string query)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest("Query parameter is required.");
            }

            var searchResult = await searchProvider.SearchAsync<BaseModel<string>>(query);

            return Ok(searchResult);
        }
        catch
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}