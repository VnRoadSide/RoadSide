using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging;

namespace RoadSide.Core.Services;

public interface IHttpClient<T>
{
    Task<T?> GetAsync(string uri, IDictionary<string, string>? headers = null);
    Task<T?> PostAsync(string uri, T data, IDictionary<string, string>? headers = null);
    Task<T?> PutAsync(string uri, T data, IDictionary<string, string>? headers = null);
    Task<bool> DeleteAsync(string uri, IDictionary<string, string>? headers = null);
}

public class HttpClient<T>(HttpClient httpClient, ISettingService settingService, ILogger<HttpClient<T>> logger)
    : IHttpClient<T>
{
    private void AddHeaders(HttpRequestMessage request, IDictionary<string, string>? headers)
    {
        ArgumentNullException.ThrowIfNull(request);

        // Construct the reference key using the type name
        const string referenceKey = $"{nameof(T)}_AccessToken";

        // Retrieve access token from settings using the custom reference key
        string? accessToken = null;
        var result = settingService.GetAsync<string>(referenceKey);

        if (result.IsSuccess)
        {
            accessToken = result.Value;
        }
        else
        {
            // Handle the error appropriately
            logger.LogError($"Error retrieving access token for {nameof(T)}: {result.Error}");
        }

        // Add Authorization header if access token is available
        if (!string.IsNullOrEmpty(accessToken))
        {
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        }

        // Add custom headers if provided
        if (headers == null) return;
        foreach (var header in headers)
        {
            if (!request.Headers.TryAddWithoutValidation(header.Key, header.Value))
            {
                logger.LogError($"Failed to add header: {header.Key}");
            }
        }
    }

    public async Task<T?> GetAsync(string uri, IDictionary<string, string>? headers = null)
    {
        if (string.IsNullOrEmpty(uri)) throw new ArgumentNullException(nameof(uri));

        var request = new HttpRequestMessage(HttpMethod.Get, uri);
        AddHeaders(request, headers);

        using var response = await httpClient.SendAsync(request).ConfigureAwait(false);
        response.EnsureSuccessStatusCode();

        var jsonData = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        if (string.IsNullOrEmpty(jsonData))
            throw new InvalidOperationException("Response content is null or empty.");

        return DeserializeJson(jsonData);
    }

    public async Task<T?> PostAsync(string uri, T data, IDictionary<string, string>? headers = null)
    {
        if (string.IsNullOrEmpty(uri)) throw new ArgumentNullException(nameof(uri));
        if (data == null) throw new ArgumentNullException(nameof(data));

        var request = new HttpRequestMessage(HttpMethod.Post, uri)
        {
            Content = CreateJsonContent(data)
        };
        AddHeaders(request, headers);

        using var response = await httpClient.SendAsync(request).ConfigureAwait(false);
        response.EnsureSuccessStatusCode();

        var resultJson = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        if (string.IsNullOrEmpty(resultJson))
            throw new InvalidOperationException("Response content is null or empty.");

        return DeserializeJson(resultJson);
    }

    public async Task<T?> PutAsync(string uri, T data, IDictionary<string, string>? headers = null)
    {
        if (string.IsNullOrEmpty(uri)) throw new ArgumentNullException(nameof(uri));
        if (data == null) throw new ArgumentNullException(nameof(data));

        var request = new HttpRequestMessage(HttpMethod.Put, uri)
        {
            Content = CreateJsonContent(data)
        };
        AddHeaders(request, headers);

        using var response = await httpClient.SendAsync(request).ConfigureAwait(false);
        response.EnsureSuccessStatusCode();

        var resultJson = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        if (string.IsNullOrEmpty(resultJson))
            throw new InvalidOperationException("Response content is null or empty.");

        return DeserializeJson(resultJson);
    }

    public async Task<bool> DeleteAsync(string uri, IDictionary<string, string>? headers = null)
    {
        if (string.IsNullOrEmpty(uri)) throw new ArgumentNullException(nameof(uri));

        var request = new HttpRequestMessage(HttpMethod.Delete, uri);
        AddHeaders(request, headers);

        using var response = await httpClient.SendAsync(request).ConfigureAwait(false);
        return response.IsSuccessStatusCode;
    }

    private HttpContent CreateJsonContent(T data)
    {
        var jsonData = JsonSerializer.Serialize(data);
        return new StringContent(jsonData, Encoding.UTF8, "application/json");
    }

    private T? DeserializeJson(string jsonData)
    {
        var result = JsonSerializer.Deserialize<T>(jsonData, new JsonSerializerOptions()
        {
            PropertyNameCaseInsensitive = true
        });

        return result;
    }
}