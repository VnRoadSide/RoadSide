using RoadSide.Core.Entities;

namespace RoadSide.Infrastructure.Repository;

public interface IRoleRepository
{
    IQueryable<Role> Get(RoleQueryOptions options);
    Task AddAsync(Role role);
    Task UpdateAsync(Role role);
    void Delete(Role role);
}

public class RoleQueryOptions
{
    public bool IncludeClaims { get; set; }
}