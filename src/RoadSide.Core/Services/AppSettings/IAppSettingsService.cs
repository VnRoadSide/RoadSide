namespace RoadSide.Core.Services.AppSettings;

public interface IAppSettingsService
{
    ValueTask<ICollection<RoadSide.Domain.AppSettings>> GetAllAsync();
    ValueTask UpdateAsync(ICollection<RoadSide.Domain.AppSettings> settings);
    ValueTask<RoadSide.Domain.AppSettings> AddAsync(RoadSide.Domain.AppSettings setting);
    ValueTask Remove(string id);
    ValueTask<RoadSide.Domain.AppSettings?> GetById(string referenceKey);
}