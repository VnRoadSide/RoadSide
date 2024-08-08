using Microsoft.Extensions.DependencyInjection;
using RoadSide.Core.Services.AppSettings;
using RoadSide.Core.Services.Products;
using RoadSide.Core.Services.Users;
using RoadSide.Core.Services;

namespace RoadSide.Core.Extensions;

public static class ServiceCollections
{
    public static IServiceCollection AddCoreServices(this IServiceCollection services)
    {
        // Configure and register your core services here
        // services.AddTransient<IMyService, MyService>();
        services.AddScoped<IAppSettingsService, AppSettingsService>();
        
        services.AddScoped<IOrderService, OrderService>();
        services.AddScoped<IProductService, ProductService>();

        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<IPriceService, PricesService>();
        services.AddScoped<IUserService, UserService>();

        services.AddScoped<IUsersService, UsersService>();
        
        // You can also configure services using the configuration parameter
        // var someConfigValue = configuration.GetValue<string>("SomeConfigKey");
        // services.AddSingleton(new MyConfigService(someConfigValue));
        services.AddAutoMapper(typeof(AutoMapperProfile));
        return services;
    }
}