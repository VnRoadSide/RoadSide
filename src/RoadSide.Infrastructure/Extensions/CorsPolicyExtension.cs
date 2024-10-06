// Infrastructure/Extensions/CorsPolicyExtensions.cs

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

namespace RoadSide.Infrastructure.Extensions;

public static class CorsPolicyExtensions
{
    public static string AllowedOriginsPolicy = "AllowedOriginsPolicy";
    public static IServiceCollection AddCustomCors(this IServiceCollection services, IConfiguration configuration)
    {
        // Load the AllowedOrigins from appsettings.json
        var allowedOrigins = configuration.GetSection("AllowedOrigins").Get<string[]>();

        // Add CORS policy
        services.AddCors(options =>
        {
            options.AddPolicy(AllowedOriginsPolicy, builder =>
            {
                builder.WithOrigins(allowedOrigins) // Read allowed origins from appsettings
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });

        return services;
    }
}