using AutoMapper;
using RoadSide.Core.Extensions;

namespace RoadSide.Core.Services;

public interface IPriceService : IService<Domain.Prices, Entities.Prices>;

internal class PriceService(ICoreDbContext context, IMapper mapper)
    : Service<Domain.Prices, Entities.Prices>(context, mapper), IPriceService;