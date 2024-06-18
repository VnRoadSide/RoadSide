using RoadSide.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RoadSide.Infrastructure.Repository;

namespace RoadSide.Infrastructure.Identity;

public class AppRoleStore: IRoleStore<Role>
{
    private readonly IRoleRepository _roleRepository;

    public AppRoleStore(IRoleRepository roleRepository)
    {
        _roleRepository = roleRepository;
    }

    public void Dispose()
    {
        // Dispose of any resources if necessary
    }

    public async Task<IdentityResult> CreateAsync(Role role, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (role == null)
        {
            throw new ArgumentNullException(nameof(role));
        }

        await _roleRepository.AddAsync(role);
        return IdentityResult.Success;
    }

    public async Task<IdentityResult> DeleteAsync(Role role, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (role == null)
        {
            throw new ArgumentNullException(nameof(role));
        }

        _roleRepository.Delete(role);
        return IdentityResult.Success;
    }

    public async Task<Role> FindByIdAsync(string roleId, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (string.IsNullOrWhiteSpace(roleId))
        {
            throw new ArgumentException("Invalid role ID", nameof(roleId));
        }

        return await _roleRepository.Get(new RoleQueryOptions{ IncludeClaims = true }).FirstOrDefaultAsync(x => x.Id == Guid.Parse(roleId), cancellationToken: cancellationToken);
    }

    public async Task<Role> FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (string.IsNullOrWhiteSpace(normalizedRoleName))
        {
            throw new ArgumentException("Invalid role name", nameof(normalizedRoleName));
        }

        return await _roleRepository.Get(new RoleQueryOptions{ IncludeClaims = true }).FirstOrDefaultAsync(x => x.NormalizedName == normalizedRoleName, cancellationToken: cancellationToken);
    }

    public Task<string> GetNormalizedRoleNameAsync(Role role, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (role == null)
        {
            throw new ArgumentNullException(nameof(role));
        }

        return Task.FromResult(role.NormalizedName);
    }

    public Task<string> GetRoleIdAsync(Role role, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (role == null)
        {
            throw new ArgumentNullException(nameof(role));
        }

        return Task.FromResult(role.Id.ToString());
    }

    public Task<string> GetRoleNameAsync(Role role, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (role == null)
        {
            throw new ArgumentNullException(nameof(role));
        }

        return Task.FromResult(role.Name);
    }

    public Task SetNormalizedRoleNameAsync(Role role, string normalizedName, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (role == null)
        {
            throw new ArgumentNullException(nameof(role));
        }

        role.NormalizedName = normalizedName;
        return Task.CompletedTask;
    }

    public Task SetRoleNameAsync(Role role, string roleName, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (role == null)
        {
            throw new ArgumentNullException(nameof(role));
        }

        role.Name = roleName;
        return Task.CompletedTask;
    }

    public async Task<IdentityResult> UpdateAsync(Role role, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (role == null)
        {
            throw new ArgumentNullException(nameof(role));
        }

        await _roleRepository.UpdateAsync(role);
        return IdentityResult.Success;
    }
}