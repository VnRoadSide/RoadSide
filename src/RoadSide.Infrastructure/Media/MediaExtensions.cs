using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RoadSide.Core.Services;

namespace RoadSide.Infrastructure.Media;

public static class MediaExtensions
{
    private const string Cloudinary = nameof(Cloudinary);
    public static IServiceCollection AddMedia(this IServiceCollection services, IConfiguration configuration)
    {
        var mediaProvider = configuration.GetConnectionString(Cloudinary);
        if (string.IsNullOrEmpty(mediaProvider))
        {
            throw new Exception("No media service connection string found.");
        }
        services.AddScoped(provider => new Cloudinary(mediaProvider));
        services.AddScoped<IMediaService, MediaService>();
        return services;
    } 
}