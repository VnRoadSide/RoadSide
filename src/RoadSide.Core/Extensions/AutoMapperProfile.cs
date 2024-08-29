using AutoMapper;
using RoadSide.Domain;
using Newtonsoft.Json;

namespace RoadSide.Core.Extensions;

public class AdditionalPropertiesResolver : IValueResolver<object, object, Dictionary<string, object>>
{
    public Dictionary<string, object> Resolve(object source, object destination, Dictionary<string, object> destMember, ResolutionContext context)
    {
        // Assuming source is a class that has a JSON string property representing the additional properties
        var jsonString = source.GetType().GetProperty("AdditionalPropertiesJson")?.GetValue(source)?.ToString();

        if (string.IsNullOrEmpty(jsonString))
        {
            return new Dictionary<string, object>();
        }

        // Define JsonSerializerSettings with the custom converter
        var settings = new JsonSerializerSettings();
        settings.Converters.Add(new AdditionalPropertiesConverter());

        // Deserialize the JSON string to a dictionary using the custom converter
        var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonString, settings);
        return dictionary ?? new Dictionary<string, object>();
    }
}

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<AppSettings, Entities.AppSettings>();
        CreateMap<Entities.AppSettings, AppSettings>();

        CreateMap<User, Entities.User>()
            .ForMember(dest => dest.AddressJson, act => act.MapFrom(src => JsonConvert.SerializeObject(src.Address)))
            .ForMember(dest => dest.AdditionalPropertiesJson, act => act.MapFrom(src => JsonConvert.SerializeObject(src.AdditionalProperties)));
        CreateMap<Entities.User, User>()
            .ForMember(dest => dest.Address,
                act => act.MapFrom(src => JsonConvert.DeserializeObject<Address>(src.AddressJson)))
            .ForMember(dest => dest.Roles, act => act.MapFrom(src => src.UserRoles.Select(t => t.Role).ToList()))
            .ForMember(dest => dest.AdditionalProperties, opt => opt.MapFrom<AdditionalPropertiesResolver>());
        CreateMap<Role, Entities.Role>().ReverseMap();

        CreateMap<Orders, Entities.Orders>()
            .ForMember(dest => dest.User, act => act.Ignore())
            .ForMember(dest => dest.UserId, act => act.MapFrom(src => src.User.Id));
        
        CreateMap<Entities.Orders, Orders>();
        CreateMap<OrderItem, Entities.OrderItem>()
            .ForMember(dest => dest.Product, act => act.Ignore())
            .ForMember(dest => dest.ProductId, act => act.MapFrom(src => src.Product.Id))
            .ForMember(dest => dest.Order, act => act.Ignore())
            .ForMember(dest => dest.OrderId, act => act.MapFrom(src => src.Order.Id));
        
        CreateMap<Entities.OrderItem, OrderItem>();
        CreateMap<Voucher, Entities.Voucher>();
        CreateMap<Entities.Voucher, Voucher>();

        CreateMap<Products, Entities.Products>()
            .ForMember(dest => dest.Vendor, act => act.Ignore())
            .ForMember(dest => dest.VendorId, act => act.MapFrom(src => src.Vendor.Id));
        
        CreateMap<Entities.Products, Products>();
        CreateMap<Category, Entities.Category>();
        CreateMap<Entities.Category, Category>();
        CreateMap<Prices, Entities.Prices>();
        CreateMap<Entities.Prices, Prices>();
        CreateMap<Entities.Notifications, Notifications>()
            .ForMember(dest => dest.From, act => act.MapFrom(src => src.FromUserRole.User))
            .ForMember(dest => dest.To, act => act.MapFrom(src => src.ToUserRole.User));
    }
}