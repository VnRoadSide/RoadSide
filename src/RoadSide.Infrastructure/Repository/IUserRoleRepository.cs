using RoadSide.Core.Entities;

namespace RoadSide.Infrastructure.Repository
{
    public interface IUserRoleRepository
    {
        Task AddUserRoleAsync(Guid userId, Guid roleId);
        Task RemoveUserRoleAsync(Guid userId, Guid roleId);
        Task<bool> UserHasRoleAsync(Guid userId, Guid roleId);
        Task<IList<Role>> GetRolesByUserIdAsync(Guid userId);
        Task<IList<Guid>> GetUserIdsByRoleIdAsync(Guid roleId);
    }
}