using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RoadSide.Core.Extensions;
using RoadSide.Core.Services;
using RoadSide.Domain;

namespace RoadSide.Infrastructure.Search;

public class AlgoliaReindexService : BackgroundService
{
    private readonly ISearchProvider _searchProvider;
    private readonly ISettingService _settingService;
    private readonly ILogger<AlgoliaReindexService> _logger;
    private readonly ICoreDbContext _context;
    private readonly TimeSpan _reindexInterval = TimeSpan.FromHours(1); // Set your desired interval

    public AlgoliaReindexService(
        ISearchProvider searchProvider,
        ISettingService settingService,
        ILogger<AlgoliaReindexService> logger, ICoreDbContext context)
    {
        _searchProvider = searchProvider;
        _settingService = settingService;
        _logger = logger;
        _context = context;
    }

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Algolia Reindex Service is starting.");

        while (!cancellationToken.IsCancellationRequested)
        {
            var createdOn = DateTime.UtcNow;
            var status = "Success";

            try
            {
                _logger.LogInformation("Starting data fetch and reindex at {Time}.", createdOn);

                // Fetch data from your database
                await FetchFromDatabase();

                _logger.LogInformation("Data reindexed successfully at {Time}.", DateTime.UtcNow);
            }
            catch (Exception ex)
            {
                status = "Failed";
                _logger.LogError(ex, "An error occurred during reindexing at {Time}.", DateTime.UtcNow);
            }
            finally
            {
                // Save the schedule run status
                await _settingService.AddAsync(new AppSettings
                {
                    ReferenceKey = "AlgoliaReindexStatus",
                    Value = status,
                    CreatedOn = createdOn
                }, cancellationToken);

                // Wait for the next interval or until cancellation
                await Task.Delay(_reindexInterval, cancellationToken);
            }
        }

        _logger.LogInformation("Algolia Reindex Service is stopping.");
    }

    private async Task FetchFromDatabase()
    {
        var baseModelType = typeof(BaseModel<>);
        var assembly = baseModelType.Assembly;

        var types = assembly.GetTypes()
            .Where(t => t.IsClass && !t.IsAbstract && t.IsSubclassOf(baseModelType));

        foreach (var type in types)
        {
            _logger.LogInformation("Fetching data for type {TypeName}", type.Name);

            // Use reflection to get DbSet<T>
            var setMethod = typeof(DbContext).GetMethod(nameof(DbContext.Set), Array.Empty<Type>());
            var genericSetMethod = setMethod?.MakeGenericMethod(type);
            var dbSet = genericSetMethod?.Invoke(_context, null);

            // Use reflection to call AsNoTracking()
            var asNoTrackingMethod = typeof(EntityFrameworkQueryableExtensions)
                .GetMethod(nameof(EntityFrameworkQueryableExtensions.AsNoTracking))
                ?.MakeGenericMethod(type);

            var noTrackingQuery = asNoTrackingMethod?.Invoke(null, new object[] { dbSet });

            // Use reflection to call ToListAsync()
            var toListAsyncMethod = typeof(EntityFrameworkQueryableExtensions)
                .GetMethod(nameof(EntityFrameworkQueryableExtensions.ToListAsync),
                    new[] { typeof(IQueryable<>), typeof(CancellationToken) })
                ?.MakeGenericMethod(type);

            var task = (Task)toListAsyncMethod?.Invoke(null, new object[] { noTrackingQuery, CancellationToken.None });

            if (task == null) continue;
            await task.ConfigureAwait(false);

            // Get the result from the task
            var resultProperty = task.GetType().GetProperty("Result");
            var data = (IEnumerable<object>)resultProperty?.GetValue(task);

            var enumerable = (data ?? Array.Empty<object>()).ToList();
            _logger.LogInformation("Fetched {Count} records for type {TypeName}", enumerable.Count(), type.Name);

            await _searchProvider.IndexAsync(type, enumerable);
        }
    }
}