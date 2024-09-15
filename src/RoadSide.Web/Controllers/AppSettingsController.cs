using System.ComponentModel.DataAnnotations;
using RoadSide.Domain;
using Microsoft.AspNetCore.Mvc;
using RoadSide.Core.Services;

namespace RoadSide.Web.Controllers;

[ApiController]
[Route("api/settings")]
public class AppSettingsController: ControllerBase
{
    private readonly ILogger<AppSettingsController> _logger;
    private readonly ISettingService _settingService;
    

    public AppSettingsController(ILogger<AppSettingsController> logger, ISettingService settingService)
    {
        _logger = logger;
        _settingService = settingService;
    }

    [HttpGet]
    public async ValueTask<IActionResult> GetAllSettingsAsync()
    {
        try
        {
            var settings=  await _settingService.GetAllAsync();
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
            var result = await _settingService.AddAsync(setting);
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
    public async ValueTask<IActionResult> UpdateSettings([FromBody] AppSettings settings)
    {
        try
        {
            await _settingService.UpdateAsync(settings);
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
            await Task.Run(() => _settingService.RemoveAsync(id));
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