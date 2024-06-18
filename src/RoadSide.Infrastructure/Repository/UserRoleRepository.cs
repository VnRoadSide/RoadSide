using RoadSide.Core.Entities;
using Microsoft.EntityFrameworkCore;
using RoadSide.Infrastructure.Persistence;

namespace RoadSide.Infrastructure.Repository;

public class UserRoleRepository : IUserRoleRepository
{
    private readonly CoreDbContext _context;

    public UserRoleRepository(CoreDbContext context)
    {
        _context = context;
    }

    public async Task AddUserRoleAsync(Guid userId, Guid roleId)
    {
        var userRole = new UserRole { UserId = userId, RoleId = roleId };
        await _context.UserRole.AddAsync(userRole);
    }

    public async Task RemoveUserRoleAsync(Guid userId, Guid roleId)
    {
        var userRole = await _context.UserRole
            .FirstOrDefaultAsync(ur => ur.UserId == userId && ur.RoleId == roleId);
        if (userRole != null)
        {
            _context.UserRole.Remove(userRole);
        }
    }

    public async Task<bool> UserHasRoleAsync(Guid userId, Guid roleId)
    {
        return await _context.UserRole.AnyAsync(ur => ur.UserId == userId && ur.RoleId == roleId);
    }

    public async Task<IList<Role>> GetRolesByUserIdAsync(Guid userId)
    {
        return await _context.UserRole
            .Where(ur => ur.UserId == userId)
            .Select(ur => ur.Role)
            .ToListAsync();
    }

    public async Task<IList<Guid>> GetUserIdsByRoleIdAsync(Guid roleId)
    {
        return await _context.UserRole
            .Where(ur => ur.RoleId == roleId)
            .Select(ur => ur.UserId)
            .ToListAsync();
    }
}