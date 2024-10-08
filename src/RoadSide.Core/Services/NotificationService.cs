using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;
using RoadSide.Domain;
using RoadSide.Domain.Context;

namespace RoadSide.Core.Services;
public class QueryNotifications : QueryPaging
{
    public bool IsPersonal { get; set; }
}

public interface INotificationService : IService<Notification, Entities.Notifications>
{
    ValueTask<Paging<Notifier>> GetAllAsync(QueryNotifications option);
    ValueTask NotifyAsync(ICollection<Notification> notifier);
}

internal class NotificationsService(ICoreDbContext context, IMapper mapper, IAppContext appContext)
    : Service<Notification, Entities.Notifications>(context, mapper), INotificationService
{
    private readonly IMapper _mapper = mapper;
    private readonly ICoreDbContext _context = context;

    public async ValueTask<Paging<Notifier>> GetAllAsync(QueryNotifications option)
    {
        var query = GetQueryable()
            .Where(x => x.IsPersonal == option.IsPersonal)
            .Where(x => x.ToId == appContext.UserId)
            .OrderByDescending(x => x.CreatedOn)
            .AsNoTracking();

        var pagedData = await query.GetPaging(option).ToListAsync();
        var notifiers = _mapper.Map<ICollection<Notification>>(pagedData)
            .Cast<Notifier>()
            .ToList();
        
        return new Paging<Notifier>
        {
            Total = query.Count(),
            Data = notifiers
        };
    }
    
    public async ValueTask NotifyAsync(ICollection<Notification> notifier)
    {
        await _context.Notification.AddRangeAsync(_mapper.Map<ICollection<Entities.Notifications>>(notifier));
        await _context.SaveChangesAsync();
    }
}