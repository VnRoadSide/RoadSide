using RoadSide.Core.Extensions;
using RoadSide.Infrastructure.Extensions;
using RoadSide.Infrastructure.Jwt;
using RoadSide.Migrator;
using Microsoft.OpenApi.Models;
using RoadSide.Infrastructure.Cache;
using RoadSide.Infrastructure.Media;

var builder = WebApplication.CreateBuilder(args);

// Check for appsettings.cloud.json is existed or not
builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    // Add configuration from app settings.json
    .AddJsonFile(File.Exists("appsettings.cloud.json") ? "appsettings.cloud.json" : "appsettings.json")
    .AddEnvironmentVariables();

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection(nameof(JwtSettings)));

// Add services to the container.
builder.Services.AddMigrator(builder.Configuration);
builder.Services.AddRepositories();
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddStripe(builder.Configuration);
builder.Services.AddCoreServices();

builder.Services.AddCaches(builder.Configuration);
builder.Services.AddMedia(builder.Configuration);
builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = 
        Newtonsoft.Json.ReferenceLoopHandling.Ignore);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "RoadSide", Version = "v1" });
    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter 'Bearer' [space] and then your valid token in the text input below.\n\nExample: \"Bearer 12345abcdef\""
    });

    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});



var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();