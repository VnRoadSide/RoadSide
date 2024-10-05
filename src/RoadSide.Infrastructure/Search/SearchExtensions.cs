using Algolia.Search.Clients;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RoadSide.Core.Services;

namespace RoadSide.Infrastructure.Search;

public static class SearchExtensions
{
    public static IServiceCollection AddSearchProvider(this IServiceCollection services, IConfiguration configuration)
    {
        // Retrieve the Algolia App ID and API Key from the IConfiguration
        var settings = configuration.GetSection(nameof(SearchSettings)).Get<SearchSettings>();

        // Configure the Algolia SearchClient with API keys
        var client = new SearchClient(settings.AppId, settings.ApiKey);
            
        // Register the SearchClient as a singleton service
        services.AddSingleton(client);

        // Register the AlgoliaService as the implementation of ISearchProvider
        services.AddScoped<ISearchProvider, AlgoliaService>();
        
        // services.AddHostedService<AlgoliaReindexService>();

        return services;
    }
    
}