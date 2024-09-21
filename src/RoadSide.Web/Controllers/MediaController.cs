
using Microsoft.AspNetCore.Mvc;
using RoadSide.Core.Services;
using RoadSide.Infrastructure.Media; // If your infrastructure implementations are in this namespace

namespace RoadSide.Web.Controllers;

[ApiController]
[Route("api/media")]
public class MediaController : ControllerBase
{
    private readonly IMediaService _mediaService;

    public MediaController(IMediaService mediaService)
    {
        _mediaService = mediaService;
    }

    /// <summary>
    /// Upload a media file (image or video)
    /// </summary>
    /// <param name="file">The file to upload</param>
    /// <returns>The URL of the uploaded media</returns>
    [HttpPost("upload")]
    public async Task<IActionResult> UploadMedia([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file provided or file is empty.");
        }

        try
        {
            // Convert IFormFile to Resource
            var resource = FileResourceMapper.ToResource(file);

            // Call the service to upload the resource
            var resultUrl = await _mediaService.UploadAsync(resource);

            if (!string.IsNullOrEmpty(resultUrl))
            {
                return Ok(new { Url = resultUrl });
            }

            return BadRequest("Failed to upload media.");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        finally
        {
            // Ensure the stream in FileResource is disposed
            file?.OpenReadStream().Dispose();
        }
    }

    /// <summary>
    /// Delete a media file
    /// </summary>
    /// <param name="publicId">The public ID of the media file to delete</param>
    /// <returns>Status of the deletion</returns>
    [HttpDelete("delete/{publicId}")]
    public async Task<IActionResult> DeleteMedia(string publicId)
    {
        if (string.IsNullOrEmpty(publicId))
        {
            return BadRequest("Invalid public ID.");
        }

        // For deletion, we assume you still have a way to identify if the resource is an image or video (e.g., from your database or an API call).
        bool isDeleted = await _mediaService.DeleteAsync(publicId);

        if (isDeleted)
        {
            return Ok("Media deleted successfully.");
        }

        return BadRequest("Failed to delete media.");
    }
}
