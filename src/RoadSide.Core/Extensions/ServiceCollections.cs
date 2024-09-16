using Microsoft.Extensions.DependencyInjection;
using RoadSide.Core.Services;

namespace RoadSide.Core.Extensions;

public static class ServiceCollections
{
    public static IServiceCollection AddCoreServices(this IServiceCollection services)
    {
        services.AddScoped(typeof(IService<,>), typeof(Service<,>));
        services.AddScoped<ISettingService, SettingService>();
        
        services.AddScoped<IOrderService, OrderService>();
        services.AddScoped<IProductService, ProductService>();

        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IVoucherService, VoucherService>();
        services.AddScoped<INotificationService, NotificationsService>();
        
        services.AddAutoMapper(typeof(AutoMapperProfile));
        return services;
    }
}