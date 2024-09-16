using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Caching.Memory;
using RoadSide.Core.Services;
using StackExchange.Redis;

namespace RoadSide.Infrastructure.Cache;

public class CacheService : ICacheService
{
    private readonly IDatabase _redis;
    private readonly IMemoryCache _memoryCache;
    private readonly TimeSpan _defaultMemoryCacheExpiration = TimeSpan.FromMinutes(5); // Default memory cache expiration

    public CacheService(IConnectionMultiplexer muxer, IMemoryCache memoryCache)
    {
        _redis = muxer.GetDatabase();
        _memoryCache = memoryCache;
    }

    public async Task<T> GetOrCreateAsync<T>(string cacheKey, Func<Task<T>> retrieveDataFunc, TimeSpan? slidingExpiration = null)
    {
        // // First check the in-memory cache
        // if (_memoryCache.TryGetValue(cacheKey, out T memoryCacheData))
        // {
        //     return memoryCacheData;
        // }

        // If not in memory cache, check Redis
        var cachedData = await _redis.StringGetAsync(cacheKey);

        if (!cachedData.IsNullOrEmpty)
        {
            var redisData = JsonSerializer.Deserialize<T>(cachedData, new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve, // Handle object references
                PropertyNameCaseInsensitive = true // Ensure case-insensitive deserialization
            });

            // // Cache the data in memory as well
            // _memoryCache.Set(cacheKey, redisData, _defaultMemoryCacheExpiration);

            return redisData;
        }

        // If neither cache contains the data, fetch from source
        var data = await retrieveDataFunc();

        // Cache in Redis
        var serializedData = JsonSerializer.Serialize(data, new JsonSerializerOptions
        {
            ReferenceHandler = ReferenceHandler.Preserve,
            PropertyNameCaseInsensitive = true
        });

        await _redis.StringSetAsync(cacheKey, serializedData, slidingExpiration);

        // // Also cache in memory
        // _memoryCache.Set(cacheKey, data, _defaultMemoryCacheExpiration);

        return data;
    }

    public T Get<T>(string cacheKey)
    {
        // // First check the in-memory cache
        // if (_memoryCache.TryGetValue(cacheKey, out T memoryCacheData))
        // {
        //     return memoryCacheData;
        // }

        // If not in memory cache, check Redis
        var cachedData = _redis.StringGet(cacheKey);

        if (!cachedData.IsNullOrEmpty)
        {
            var redisData = JsonSerializer.Deserialize<T>(cachedData, new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                PropertyNameCaseInsensitive = true
            });

            // // Cache in memory
            // _memoryCache.Set(cacheKey, redisData, _defaultMemoryCacheExpiration);

            return redisData;
        }

        return default(T);
    }

    public async Task InvalidateAsync<T>(string cacheKey)
    {
        // Remove from both caches
        // _memoryCache.Remove(cacheKey);
        await _redis.KeyDeleteAsync(cacheKey);
    }
}
