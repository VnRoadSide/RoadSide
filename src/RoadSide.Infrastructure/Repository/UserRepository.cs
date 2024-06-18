using RoadSide.Core.Entities;
using Microsoft.EntityFrameworkCore;
using RoadSide.Infrastructure.Persistence;

namespace RoadSide.Infrastructure.Repository;

public class UserRepository : IUserRepository
{
    private readonly CoreDbContext _context;

    public UserRepository(CoreDbContext context)
    {
        _context = context;
    }
    
    public IQueryable<User> Get(UserQueryOptions options)
    {
        var query = _context.Set<User>().AsQueryable();

        if (options.IncludeTokens)
        {
            query = query.Include(u => u.Tokens);
        }

        if (options.IncludeRoles)
        {
            query = query
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role);
        }

        return query;
    }

    public async Task AddOrUpdateAsync(User user)
    {
        if (_context.Users.Any(u => u.Id == user.Id))
        {
            _context.Users.Update(user);
        }
        else
        {
            await _context.Users.AddAsync(user);
        }
    }

    public void Delete(User user)
    {
        _context.Users.Remove(user);
    }
}