using System.Reflection;
using RoadSide.Core.Extensions;
using RoadSide.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace RoadSide.Migrator;

public static class ServiceCollections
{
    private static IServiceCollection AddSqlServerPersistence(this IServiceCollection services,
        string connectionString)
    {
        services.AddDbContext<CoreDbContext>(options =>
            options.UseSqlServer(connectionString,
                builder => builder
                    .MigrationsAssembly(Constant.Migrator)
                ), 
            ServiceLifetime.Transient
        );
        services.AddScoped<ICoreDbContext>(provider => provider.GetService<CoreDbContext>());
        return services;
    }

    private static IServiceCollection AddPgPersistence(this IServiceCollection services,
        string connectionString)
    {
        services.AddDbContext<CoreDbContext>(options => options
            .UseNpgsql(
                connectionString,
                builder => builder
                    .MigrationsAssembly(Constant.Migrator)
                    .EnableRetryOnFailure()
            ).UseSnakeCaseNamingConvention(),
            ServiceLifetime.Transient
        );
        services.AddScoped<ICoreDbContext>(provider => provider.GetService<CoreDbContext>());
        return services;
    }
    
    public static IServiceCollection AddMigrator(this IServiceCollection services, IConfiguration configuration)
    {
        var postgres = configuration.GetConnectionString(Constant.Postgres);
        if (!string.IsNullOrEmpty(postgres))
        {
            services.AddPgPersistence(postgres);
            return services;
        }

        var sqlserver = configuration.GetConnectionString(Constant.SqlServer);
        if (string.IsNullOrEmpty(sqlserver))
        {
            throw new Exception("No database connection string found.");
        }
        services.AddSqlServerPersistence(sqlserver);
        return services;
    }
}