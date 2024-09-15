using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;
using RoadSide.Domain;
using RoadSide.Domain.Context;

namespace RoadSide.Core.Services;
public class QueryNotifications : QueryPaging
{
}

public interface INotificationService : IService<Notifications, Entities.Notifications>
{
    ValueTask<PagingResult<Notifications>> GetAllAsync(QueryNotifications option);
}

internal class NotificationsService(ICoreDbContext context, IMapper mapper, IAppUserContext appUserContext)
    : Service<Notifications, Entities.Notifications>(context, mapper), INotificationService
{
    private readonly IMapper _mapper = mapper;

    public async ValueTask<PagingResult<Notifications>> GetAllAsync(QueryNotifications option)
    {
        var query = GetQueryable()
            .Include(x => x.ToUserRole)
            .Where(x => x.ToUserRole.UserId == appUserContext.User.Id)
            .OrderByDescending(x => x.CreatedOn)
            .AsNoTracking();

        var pagedData = await query.GetPaging(option).ToListAsync();

        return new PagingResult<Notifications>
        {
            Total = query.Count(),
            Data = _mapper.Map<ICollection<Notifications>>(pagedData)
        };
    }
}