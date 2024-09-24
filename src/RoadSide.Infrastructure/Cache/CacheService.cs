using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using RoadSide.Core.Services;

namespace RoadSide.Infrastructure.Cache;

public class CacheService : ICacheService
{
    private readonly IMemoryCache _memoryCache;
    private readonly IDistributedCache _distributedCache;
    private readonly TimeSpan _defaultMemoryCacheExpiration = TimeSpan.FromMinutes(5); // Default memory cache expiration

    public CacheService(IMemoryCache memoryCache, IDistributedCache distributedCache)
    {
        _memoryCache = memoryCache;
        _distributedCache = distributedCache;
    }

    public async Task<T> GetOrCreateAsync<T>(string cacheKey, Func<Task<T>> retrieveDataFunc, TimeSpan? slidingExpiration = null)
    {
        // First, check the in-memory cache
        if (_memoryCache.TryGetValue(cacheKey, out T memoryCacheData))
        {
            return memoryCacheData;
        }

        // Next, check the distributed cache
        var cachedData = await _distributedCache.GetStringAsync(cacheKey);

        if (!string.IsNullOrEmpty(cachedData))
        {
            var deserializedData = JsonSerializer.Deserialize<T>(cachedData, new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve, // Handle object references
                PropertyNameCaseInsensitive = true            // Ensure case-insensitive deserialization
            });

            // Cache the data in memory as well
            _memoryCache.Set(cacheKey, deserializedData, _defaultMemoryCacheExpiration);

            return deserializedData;
        }

        // If neither cache contains the data, fetch from the data source
        var data = await retrieveDataFunc();

        // Serialize the data
        var serializedData = JsonSerializer.Serialize(data, new JsonSerializerOptions
        {
            ReferenceHandler = ReferenceHandler.Preserve,
            PropertyNameCaseInsensitive = true
        });

        // Set cache options
        var cacheOptions = new DistributedCacheEntryOptions
        {
            SlidingExpiration = slidingExpiration ?? TimeSpan.FromMinutes(60) // Default to 60 minutes if not specified
        };

        // Store in the distributed cache
        await _distributedCache.SetStringAsync(cacheKey, serializedData, cacheOptions);

        // Also cache in memory
        _memoryCache.Set(cacheKey, data, _defaultMemoryCacheExpiration);

        return data;
    }

    public T Get<T>(string cacheKey)
    {
        // First, check the in-memory cache
        if (_memoryCache.TryGetValue(cacheKey, out T memoryCacheData))
        {
            return memoryCacheData;
        }

        // Next, check the distributed cache
        var cachedData = _distributedCache.GetString(cacheKey);

        if (!string.IsNullOrEmpty(cachedData))
        {
            var deserializedData = JsonSerializer.Deserialize<T>(cachedData, new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                PropertyNameCaseInsensitive = true
            });

            // Cache in memory
            _memoryCache.Set(cacheKey, deserializedData, _defaultMemoryCacheExpiration);

            return deserializedData;
        }

        return default;
    }

    public async Task InvalidateAsync<T>(string cacheKey)
    {
        // Remove from both caches
        _memoryCache.Remove(cacheKey);
        await _distributedCache.RemoveAsync(cacheKey);
    }
}