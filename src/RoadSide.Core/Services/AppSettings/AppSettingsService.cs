using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;

namespace RoadSide.Core.Services.AppSettings;

public class AppSettingsService : IAppSettingsService
{
    private readonly ICoreDbContext _context;
    private readonly IMapper _mapper;

    public AppSettingsService(ICoreDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async ValueTask<ICollection<RoadSide.Domain.AppSettings>> GetAllAsync()
    {
        var entities = await _context.AppSettings.ToListAsync();
        return _mapper.Map<IList<RoadSide.Domain.AppSettings>>(entities);
    }
    
    public async ValueTask<RoadSide.Domain.AppSettings?> GetById(string referenceKey)
    {
        var entities = await _context.AppSettings.ToListAsync();
        var result = entities.Find(t=> t.ReferenceKey == referenceKey);
        return _mapper.Map<RoadSide.Domain.AppSettings>(result);
    }

    public async ValueTask UpdateAsync(ICollection<RoadSide.Domain.AppSettings> settings)
    {
        foreach (var setting in settings)
        {
            var entity = await _context.AppSettings
                .FirstOrDefaultAsync(s => s.Id == setting.Id);

            if (entity is null)
            {
                throw new ValidationException($"Invalid: {setting.ReferenceKey} is not existed.");
            }
            _context.AppSettings.Entry(entity).CurrentValues.SetValues( _mapper.Map<Entities.AppSettings>(setting));
            await _context.SaveChangesAsync();
        }
    }

    public async ValueTask<RoadSide.Domain.AppSettings> AddAsync(RoadSide.Domain.AppSettings setting)
    {
        if (string.IsNullOrWhiteSpace(setting.ReferenceKey))
        {
            throw new ValidationException($"Invalid: {nameof(RoadSide.Domain.AppSettings.ReferenceKey)} should not be empty.");
        }
            
        var entity = _context.AppSettings.Add(_mapper.Map<Entities.AppSettings>(setting)).Entity;
        await _context.SaveChangesAsync();
        return _mapper.Map<RoadSide.Domain.AppSettings>(entity);
    }

    public async ValueTask Remove(string id)
    {
        var entities = await _context.AppSettings.ToListAsync();
        var result = entities.Find(t => t.Id.ToString() == id);

        if (result is null)
        {
            throw new ValidationException($"Invalid: {id} is not existed.");
        }

        _context.AppSettings.Remove(result);
        await _context.SaveChangesAsync();
    }
}