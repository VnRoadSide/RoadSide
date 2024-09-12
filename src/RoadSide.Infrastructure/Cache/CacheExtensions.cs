using Microsoft.Extensions.Configuration;
using RoadSide.Core.Services;
using StackExchange.Redis;

namespace RoadSide.Infrastructure.Cache;

using Microsoft.Extensions.DependencyInjection;

public static class CachingServiceCollectionExtensions
{
    public static IServiceCollection AddCaches(this IServiceCollection services, IConfiguration configuration)
    {
        var settings = configuration.GetSection(nameof(CacheSettings)).Get<CacheSettings>();
        if (settings is null)
        {
            throw new Exception("No cache settings found.");
        }
        services.AddMemoryCache(opt =>
        {
            opt.SizeLimit = settings?.InMemory?.SizeLimit;
        });

        var distributedProvider = settings?.Distributed?.Provider;

        switch (distributedProvider)
        {
            case "InMemory":
                services.AddDistributedMemoryCache(opt =>
                {
                    opt.SizeLimit = settings.Distributed?.InMemory?.SizeLimit;
                });
                break;
            case "Redis":
                services.AddSingleton<IConnectionMultiplexer>(
                    ConnectionMultiplexer.Connect(settings.Distributed.Redis.Configuration));
                break;
        }

        services.AddSingleton<ICacheService, CacheService>();

        return services;
    }
}