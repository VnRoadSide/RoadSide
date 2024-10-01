using AutoMapper;
using RoadSide.Core.Extensions;
using RoadSide.Domain.Context;

namespace RoadSide.Core.Services;

public interface IUserService: IService<Domain.User, Entities.User>
{
    Task AddOrUpdateSessionIdAsync(string? sessionId = null);
    Task<bool> ValidateSessionIdAsync(string sessionId);
}

internal class UserService(ICoreDbContext context, IMapper mapper, IAppContext appContext)
    : Service<Domain.User, Entities.User>(context, mapper), IUserService
{
    private readonly ICoreDbContext _context = context;

    public async Task AddOrUpdateSessionIdAsync(string? sessionId = null)
    {
        var user = await GetByIdAsync(appContext.UserId);
        ArgumentNullException.ThrowIfNull(user);
        user.SessionId = sessionId;
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ValidateSessionIdAsync(string sessionId)
    {
        var user = await GetByIdAsync(appContext.UserId);
        ArgumentNullException.ThrowIfNull(user);
        return user.SessionId == sessionId;
    }
}