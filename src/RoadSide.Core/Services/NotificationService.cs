using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;
using RoadSide.Domain;

namespace RoadSide.Core.Services;
public class QueryNotifications : QueryPaging
{
}

public interface INotificationService : IService<Notifications, Entities.Notifications>
{
    ValueTask<ICollection<Notifications>> GetAllAsync(QueryNotifications option);
}

internal class NotificationsService(ICoreDbContext context, IMapper mapper, IAppUserContext appUserContext)
    : Service<Notifications, Entities.Notifications>(context, mapper), INotificationService
{
    public async ValueTask<ICollection<Notifications>> GetAllAsync(QueryNotifications option)
    {
        var query = GetQueryable()
            .Where(x => x.ToId == appUserContext.User.Id)
            .OrderByDescending(x => x.CreatedOn)
            .AsNoTracking()
            .GetPaging(option);
        
        return mapper.Map<ICollection<Notifications>>(await query.ToListAsync());
    }
}