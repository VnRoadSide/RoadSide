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

    // JsonSerializerOptions with ReferenceHandler.Preserve for handling circular references
    private readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
    {
        ReferenceHandler = ReferenceHandler.Preserve,   // This handles the object references and cycles
        PropertyNameCaseInsensitive = true,            // Ensures case-insensitive property matching
    };

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
            var deserializedData = JsonSerializer.Deserialize<T>(cachedData, _jsonOptions);

            // Cache the data in memory as well, with size specification
            _memoryCache.Set(cacheKey, deserializedData, new MemoryCacheEntryOptions
            {
                Size = GetSizeOfObject(deserializedData), // Specify the size of the entry
                SlidingExpiration = _defaultMemoryCacheExpiration
            });

            return deserializedData;
        }

        // If neither cache contains the data, fetch from the data source
        var data = await retrieveDataFunc();

        // Serialize the data with ReferenceHandler.Preserve
        var serializedData = JsonSerializer.Serialize(data, _jsonOptions);

        // Set cache options
        var cacheOptions = new DistributedCacheEntryOptions
        {
            SlidingExpiration = slidingExpiration ?? TimeSpan.FromMinutes(60) // Default to 60 minutes if not specified
        };

        // Store in the distributed cache
        await _distributedCache.SetStringAsync(cacheKey, serializedData, cacheOptions);

        // Also cache in memory, with size specification
        _memoryCache.Set(cacheKey, data, new MemoryCacheEntryOptions
        {
            Size = GetSizeOfObject(data), // Specify the size of the entry
            SlidingExpiration = _defaultMemoryCacheExpiration
        });

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
            var deserializedData = JsonSerializer.Deserialize<T>(cachedData, _jsonOptions);

            // Cache in memory, with size specification
            _memoryCache.Set(cacheKey, deserializedData, new MemoryCacheEntryOptions
            {
                Size = GetSizeOfObject(deserializedData), // Specify the size of the entry
                SlidingExpiration = _defaultMemoryCacheExpiration
            });

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

    /// <summary>
    /// Estimates the size of an object for caching. You can customize this method as per your requirements.
    /// </summary>
    private long GetSizeOfObject<T>(T obj)
    {
        // Estimate the size in a simple way. You can adjust this logic based on your actual data structure.
        var json = JsonSerializer.Serialize(obj);
        return json.Length;
    }
}
