using System.Text;
using RoadSide.Core.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using RoadSide.Infrastructure.Identity;
using RoadSide.Infrastructure.Jwt;
using RoadSide.Infrastructure.Repository;
using RoadSide.Infrastructure.Stripe;
using Stripe;
using User = RoadSide.Core.Entities.User;

namespace RoadSide.Infrastructure.Extensions;

public static class ServiceCollections
{
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IRoleRepository, RoleRepository>();
        services.AddScoped<IUserRoleRepository, UserRoleRepository>();
        return services;
    }
    
    public static IServiceCollection AddStripe(this IServiceCollection services, IConfiguration configuration)
    {
        // Configure and register your core services here
        StripeConfiguration.ApiKey = configuration.GetValue<string>(Constant.StripeSecretKey);
        
        //https://github.com/stripe/stripe-dotnet/issues/1882
        services.AddTransient<CustomerService>();
        services.AddTransient<SubscriptionService>();
        services.AddTransient<InvoiceService>();
        services.AddTransient<PriceService>();
        services.AddTransient<ChargeService>();
        services.AddTransient<TokenService>();
        services.AddScoped<ICheckoutService,CheckoutService>();
        return services;
    }

    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration configuration)
    {
        //Jwt configuration starts here
        var jwtSettings = configuration
            .GetSection(nameof(JwtSettings))
            .Get<JwtSettings>();

        services.AddScoped<IJwtService, JwtService>();
        services.AddScoped<IUserClaimsPrincipalFactory<User>, AppUserClaimsPrincipleFactory>();
        services.AddScoped<IUserStore<User>, AppUserStore>();
        services.AddScoped<IRoleStore<Role>, AppRoleStore>();

        services
            .AddIdentityCore<User>(options =>
            {
                options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._+";
                options.User.RequireUniqueEmail = false;
                
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredUniqueChars = 0;
                options.Password.RequireUppercase = false;
            })
            .AddRoles<Role>()
            .AddUserStore<AppUserStore>()
            .AddRoleStore<AppRoleStore>()
            .AddDefaultTokenProviders()
            .AddUserManager<AppUserManager>();

        services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings.Issuer,
                    ValidAudience = jwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
                };
            });


        return services;
    }
}