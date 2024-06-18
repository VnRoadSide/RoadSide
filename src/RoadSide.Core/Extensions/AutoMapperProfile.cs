using AutoMapper;
using RoadSide.Domain;
using Newtonsoft.Json;

namespace RoadSide.Core.Extensions;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<AppSettings, Entities.AppSettings>();
        CreateMap<Entities.AppSettings, AppSettings>();

        CreateMap<User, Entities.User>()
            .ForMember(dest => dest.AddressJson, act => act.MapFrom(src => JsonConvert.SerializeObject(src.Address)));
        CreateMap<Entities.User, User>()
            .ForMember(dest => dest.Address,
                act => act.MapFrom(src => JsonConvert.DeserializeObject<Address>(src.AddressJson)));
        
        CreateMap<Orders, Entities.Orders>();
        CreateMap<Entities.Orders, Orders>();
        CreateMap<OrderItem, Entities.OrderItem>();
        CreateMap<Entities.OrderItem, OrderItem>();
        CreateMap<Voucher, Entities.Voucher>();
        CreateMap<Entities.Voucher, Voucher>();
        
        CreateMap<Products, Entities.Products>();
        CreateMap<Entities.Products, Products>();
        CreateMap<Category, Entities.Category>();
        CreateMap<Entities.Category, Category>();
        CreateMap<Prices, Entities.Prices>();
        CreateMap<Entities.Prices, Prices>();
        
    }
}