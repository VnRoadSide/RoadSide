using System.ComponentModel.DataAnnotations;
using RoadSide.Core.Services.AppSettings;
using RoadSide.Domain;
using Microsoft.AspNetCore.Mvc;

namespace RoadSide.Web.Controllers;

[ApiController]
[Route("api/settings")]
public class AppSettingsController: ControllerBase
{
    private readonly ILogger<AppSettingsController> _logger;
    private readonly IAppSettingsService _appSettingsService;
    

    public AppSettingsController(ILogger<AppSettingsController> logger, IAppSettingsService appSettingsService)
    {
        _logger = logger;
        _appSettingsService = appSettingsService;
    }

    [HttpGet]
    public async ValueTask<IActionResult> GetAllSettingsAsync()
    {
        try
        {
            var settings=  await _appSettingsService.GetAllAsync();
            return Ok(settings);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
    
    [HttpPost]
    public async ValueTask<IActionResult> AddNewSettingAsync([FromBody] AppSettings setting)
    {
        try
        {
            var result = await _appSettingsService.AddAsync(setting);
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
    
    [HttpPost("update")]
    public async ValueTask<IActionResult> UpdateSettings([FromBody] ICollection<AppSettings> settings)
    {
        try
        {
            await _appSettingsService.UpdateAsync(settings);
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
    public async ValueTask<IActionResult> DeleteSettingAsync([Required] string id)
    {
        try
        {
            await _appSettingsService.Remove(id);
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