using AutoMapper;
using RoadSide.Core.Extensions;

namespace RoadSide.Core.Services;

public interface ISettingService : IService<Domain.AppSettings, Entities.AppSettings>
{
    T GetAsync<T>(string referenceKey);
    ValueTask<ICollection<Domain.AppSettings>> GetAllAsync();
}

internal class SettingService(ICoreDbContext context, IMapper mapper)
    : Service<Domain.AppSettings, Entities.AppSettings>(context, mapper), ISettingService
{
    private readonly IMapper _mapper = mapper;

    public T GetAsync<T>(string referenceKey)
    {
        var entity = GetQueryable().FirstOrDefault(x => x.ReferenceKey == referenceKey);
        var result = _mapper.Map<Domain.AppSettings>(entity);
        return (T)Convert.ChangeType(result, typeof(T));
    }

    public ValueTask<ICollection<Domain.AppSettings>> GetAllAsync()
    {
        return new ValueTask<ICollection<Domain.AppSettings>>(_mapper.Map<ICollection<Domain.AppSettings>>(GetQueryable().ToList()));
    }
}