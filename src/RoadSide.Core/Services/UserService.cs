using AutoMapper;
using RoadSide.Core.Extensions;

namespace RoadSide.Core.Services;

public interface IUserService: IService<Domain.User, Entities.User>
{
    Task AddSessionIdAsync(Guid userId, string? sessionId = null);
    Task<bool> ValidateSessionIdAsync(Guid userId, string sessionId);
}

internal class UserService(ICoreDbContext context, IMapper mapper)
    : Service<Domain.User, Entities.User>(context, mapper), IUserService
{
    private readonly ICoreDbContext _context = context;

    public async Task AddSessionIdAsync(Guid userId, string? sessionId = null)
    {
        var user = await GetByIdAsync(userId);
        ArgumentNullException.ThrowIfNull(user);
        user.SessionId = sessionId;
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ValidateSessionIdAsync(Guid userId, string sessionId)
    {
        var user = await GetByIdAsync(userId);
        ArgumentNullException.ThrowIfNull(user);
        return user.SessionId == sessionId;
    }
}