using RoadSide.Core.Entities;
using Microsoft.EntityFrameworkCore;
using RoadSide.Infrastructure.Persistence;

namespace RoadSide.Infrastructure.Repository;

public class RoleRepository : IRoleRepository
{
    private readonly CoreDbContext _context;

    public RoleRepository(CoreDbContext context)
    {
        _context = context;
    }

    public IQueryable<Role> Get(RoleQueryOptions options)
    {
        var query = _context.Roles.AsQueryable();

        if (options.IncludeClaims)
        {
            query = query.Include(r => r.Claims);
        }

        return query;
    }

    public async Task AddAsync(Role role)
    {
        await _context.Roles.AddAsync(role);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Role role)
    {
        _context.Roles.Update(role);
        await _context.SaveChangesAsync();
    }

    public void Delete(Role role)
    {
        _context.Roles.Remove(role);
        _context.SaveChanges();
    }
}