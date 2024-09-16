using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;
using RoadSide.Domain;
using RoadSide.Domain.Context;

namespace RoadSide.Core.Services;
public class QueryNotifications : QueryPaging
{
}

public interface INotificationService : IService<Notification, Entities.Notifications>
{
    ValueTask<PagingResult<Notifier>> GetAllAsync(QueryNotifications option);
}

internal class NotificationsService(ICoreDbContext context, IMapper mapper, IAppUserContext appUserContext)
    : Service<Notification, Entities.Notifications>(context, mapper), INotificationService
{
    private readonly IMapper _mapper = mapper;
    private readonly ICoreDbContext _context = context;

    public async ValueTask<PagingResult<Notifier>> GetAllAsync(QueryNotifications option)
    {
        var query = GetQueryable()
            .Include(x => x.To)
            .Where(x => x.To.Id == appUserContext.User.Id)
            .OrderByDescending(x => x.CreatedOn)
            .AsNoTracking();

        var pagedData = await query.GetPaging(option).ToListAsync();
        var notifiers = _mapper.Map<ICollection<Notification>>(pagedData)
            .Cast<Notifier>()
            .ToList();
        
        return new PagingResult<Notifier>
        {
            Total = query.Count(),
            Data = notifiers
        };
    }
}