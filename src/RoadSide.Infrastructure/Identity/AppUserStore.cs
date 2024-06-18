using RoadSide.Core.Entities;
using RoadSide.Core.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RoadSide.Infrastructure.Persistence;
using RoadSide.Infrastructure.Repository;

namespace RoadSide.Infrastructure.Identity;

public class AppUserStore : IUserStore<User>,
    IUserPasswordStore<User>,
    IUserSecurityStampStore<User>,
    IUserEmailStore<User>,
    IUserPhoneNumberStore<User>,
    IUserTwoFactorStore<User>,
    IUserLockoutStore<User>,
    IUserAuthenticationTokenStore<User>,
    IUserAuthenticatorKeyStore<User>,
    IUserTwoFactorRecoveryCodeStore<User>,
    IUserRoleStore<User>
{
    private readonly CoreDbContext _context;
    private readonly IUserRepository _userRepository;
    private readonly IRoleRepository _roleRepository;
    private readonly IUserRoleRepository _userRoleRepository;

    public AppUserStore(IUserRepository userRepository, IRoleRepository roleRepository,
        IUserRoleRepository userRoleRepository, CoreDbContext context)
    {
        _userRepository = userRepository;
        _roleRepository = roleRepository;
        _userRoleRepository = userRoleRepository;
        _context = context;
    }

    public void Dispose()
    {
    }

    public async Task<IdentityResult> CreateAsync(User user, CancellationToken cancellationToken)
    {
        await _userRepository.AddOrUpdateAsync(user);
        await _context.SaveChangesAsync();
        return IdentityResult.Success;
    }

    public Task<IdentityResult> DeleteAsync(User user, CancellationToken cancellationToken)
    {
        _userRepository.Delete(user);
        return Task.FromResult(IdentityResult.Success);
    }

    public Task<User> FindByEmailAsync(string normalizedEmail, CancellationToken cancellationToken)
    {
        return _userRepository.Get(new UserQueryOptions { IncludeTokens = true })
            .FirstOrDefaultAsync(x => x.NormalizedEmail == normalizedEmail, cancellationToken: cancellationToken);
    }

    public Task<User> FindByIdAsync(string userId, CancellationToken cancellationToken)
    {
        return _userRepository.Get(new UserQueryOptions { IncludeTokens = true , IncludeRoles = true})
            .FirstOrDefaultAsync(x => x.Id == Guid.Parse(userId), cancellationToken: cancellationToken);
    }

    public Task<User> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
    {
        return _userRepository.Get(new UserQueryOptions { IncludeTokens = true })
            .FirstOrDefaultAsync(x => x.NormalizedUserName == normalizedUserName, cancellationToken: cancellationToken);
    }

    public Task<int> GetAccessFailedCountAsync(User user, CancellationToken cancellationToken)
    {
        return Task.FromResult(user.AccessFailedCount);
    }

    public Task<string> GetEmailAsync(User user, CancellationToken cancellationToken)
    {
        return Task.FromResult(user.Email);
    }

    public Task<bool> GetEmailConfirmedAsync(User user, CancellationToken cancellationToken)
    {
        return Task.FromResult(user.EmailConfirmed);
    }

    public Task<bool> GetLockoutEnabledAsync(User user, CancellationToken cancellationToken)
    {
        return Task.FromResult(user.LockoutEnabled);
    }

    public Task<DateTimeOffset?> GetLockoutEndDateAsync(User user, CancellationToken cancellationToken)
    {
        return Task.FromResult(user.LockoutEnd);
    }

    public Task<string> GetNormalizedEmailAsync(User user, CancellationToken cancellationToken)
    {
        return Task.FromResult(user.NormalizedEmail);
    }

    public Task<string> GetNormalizedUserNameAsync(User user, CancellationToken cancellationToken)
    {
        return Task.FromResult(user.NormalizedUserName);
    }

    public Task<string> GetPasswordHashAsync(User user, CancellationToken cancellationToken)
    {
        return Task.FromResult(user.PasswordHash);
    }

    public Task<string> GetPhoneNumberAsync(User user, CancellationToken cancellationToken)
    {
        return Task.FromResult(user.PhoneNumber);
    }

    public Task<bool> GetPhoneNumberConfirmedAsync(User user, CancellationToken cancellationToken)
    {
        return Task.FromResult(user.PhoneNumberConfirmed);
    }

    public Task<string> GetSecurityStampAsync(User user, CancellationToken cancellationToken)
    {
        return Task.FromResult(user.SecurityStamp ?? string.Empty);
    }

    public Task<bool> GetTwoFactorEnabledAsync(User user, CancellationToken cancellationToken)
    {
        return Task.FromResult(user.TwoFactorEnabled);
    }

    public Task<string> GetUserIdAsync(User user, CancellationToken cancellationToken)
    {
        return Task.FromResult(user.Id.ToString());
    }

    public Task<string> GetUserNameAsync(User user, CancellationToken cancellationToken)
    {
        return Task.FromResult(user.UserName);
    }

    public Task<bool> HasPasswordAsync(User user, CancellationToken cancellationToken)
    {
        return Task.FromResult(user.PasswordHash != null);
    }

    public Task<int> IncrementAccessFailedCountAsync(User user, CancellationToken cancellationToken)
    {
        user.AccessFailedCount++;
        return Task.FromResult(user.AccessFailedCount);
    }

    public Task ResetAccessFailedCountAsync(User user, CancellationToken cancellationToken)
    {
        user.AccessFailedCount = 0;
        return Task.CompletedTask;
    }

    public Task SetEmailAsync(User user, string email, CancellationToken cancellationToken)
    {
        user.Email = email;
        return Task.CompletedTask;
    }

    public Task SetEmailConfirmedAsync(User user, bool confirmed, CancellationToken cancellationToken)
    {
        user.EmailConfirmed = confirmed;
        return Task.CompletedTask;
    }

    public Task SetLockoutEnabledAsync(User user, bool enabled, CancellationToken cancellationToken)
    {
        user.LockoutEnabled = enabled;
        return Task.CompletedTask;
    }

    public Task SetLockoutEndDateAsync(User user, DateTimeOffset? lockoutEnd, CancellationToken cancellationToken)
    {
        user.LockoutEnd = lockoutEnd;
        return Task.CompletedTask;
    }

    public Task SetNormalizedEmailAsync(User user, string normalizedEmail, CancellationToken cancellationToken)
    {
        user.NormalizedEmail = normalizedEmail;
        return Task.CompletedTask;
    }

    public Task SetNormalizedUserNameAsync(User user, string normalizedName, CancellationToken cancellationToken)
    {
        user.NormalizedUserName = normalizedName;
        return Task.CompletedTask;
    }

    public Task SetPasswordHashAsync(User user, string passwordHash, CancellationToken cancellationToken)
    {
        user.PasswordHash = passwordHash;
        return Task.CompletedTask;
    }

    public Task SetPhoneNumberAsync(User user, string phoneNumber, CancellationToken cancellationToken)
    {
        user.PhoneNumber = phoneNumber;
        return Task.CompletedTask;
    }

    public Task SetPhoneNumberConfirmedAsync(User user, bool confirmed, CancellationToken cancellationToken)
    {
        user.PhoneNumberConfirmed = confirmed;
        return Task.CompletedTask;
    }

    public Task SetSecurityStampAsync(User user, string stamp, CancellationToken cancellationToken)
    {
        user.SecurityStamp = stamp;
        return Task.CompletedTask;
    }

    public Task SetTwoFactorEnabledAsync(User user, bool enabled, CancellationToken cancellationToken)
    {
        user.TwoFactorEnabled = enabled;
        return Task.CompletedTask;
    }

    public Task SetUserNameAsync(User user, string userName, CancellationToken cancellationToken)
    {
        user.UserName = userName;
        return Task.CompletedTask;
    }

    public async Task<IdentityResult> UpdateAsync(User user, CancellationToken cancellationToken)
    {
        await _userRepository.AddOrUpdateAsync(user);
        await _context.SaveChangesAsync();
        return IdentityResult.Success;
    }

    private const string AuthenticatorStoreLoginProvider = "[AuthenticatorStore]";
    private const string AuthenticatorKeyTokenName = "AuthenticatorKey";
    private const string RecoveryCodeTokenName = "RecoveryCodes";

    public Task<string> GetTokenAsync(User user, string loginProvider, string name, CancellationToken cancellationToken)
    {
        var tokenEntity = user.Tokens.SingleOrDefault(
            l => l.TokenName == name && l.LoginProvider == loginProvider);
        return Task.FromResult(tokenEntity?.TokenValue);
    }

    public async Task SetTokenAsync(User user, string loginProvider, string name, string value,
        CancellationToken cancellationToken)
    {
        var tokenEntity = user.Tokens.SingleOrDefault(
            l => l.TokenName == name && l.LoginProvider == loginProvider);
        if (tokenEntity != null)
        {
            tokenEntity.TokenValue = value;
        }
        else
        {
            user.Tokens.Add(new UserTokens
            {
                UserId = user.Id,
                LoginProvider = loginProvider,
                TokenName = name,
                TokenValue = value,
            });
        }

        await _context.SaveChangesAsync();
    }

    public async Task RemoveTokenAsync(User user, string loginProvider, string name,
        CancellationToken cancellationToken)
    {
        var tokenEntity = user.Tokens.SingleOrDefault(
            l => l.TokenName == name && l.LoginProvider == loginProvider);
        if (tokenEntity != null)
        {
            user.Tokens.Remove(tokenEntity);
            await _context.SaveChangesAsync();
        }
    }

    public Task SetAuthenticatorKeyAsync(User user, string key, CancellationToken cancellationToken)
    {
        return SetTokenAsync(user, AuthenticatorStoreLoginProvider, AuthenticatorKeyTokenName, key, cancellationToken);
    }

    public Task<string> GetAuthenticatorKeyAsync(User user, CancellationToken cancellationToken)
    {
        return GetTokenAsync(user, AuthenticatorStoreLoginProvider, AuthenticatorKeyTokenName, cancellationToken);
    }

    public Task ReplaceCodesAsync(User user, IEnumerable<string> recoveryCodes, CancellationToken cancellationToken)
    {
        var mergedCodes = string.Join(";", recoveryCodes);
        return SetTokenAsync(user, AuthenticatorStoreLoginProvider, RecoveryCodeTokenName, mergedCodes,
            cancellationToken);
    }

    public async Task<bool> RedeemCodeAsync(User user, string code, CancellationToken cancellationToken)
    {
        var mergedCodes =
            await GetTokenAsync(user, AuthenticatorStoreLoginProvider, RecoveryCodeTokenName, cancellationToken) ?? "";
        var splitCodes = mergedCodes.Split(';');
        if (!splitCodes.Contains(code)) return false;
        var updatedCodes = new List<string>(splitCodes.Where(s => s != code));
        await ReplaceCodesAsync(user, updatedCodes, cancellationToken);
        return true;
    }

    public async Task<int> CountCodesAsync(User user, CancellationToken cancellationToken)
    {
        var mergedCodes =
            await GetTokenAsync(user, AuthenticatorStoreLoginProvider, RecoveryCodeTokenName, cancellationToken) ?? "";
        return mergedCodes.Length > 0 ? mergedCodes.Split(';').Length : 0;
    }

    private async Task<Role> GetRoleAsync(string roleName, CancellationToken cancellationToken)
    {
        return await _roleRepository.Get(new RoleQueryOptions { IncludeClaims = true })
            .FirstOrDefaultAsync(x => x.NormalizedName == roleName, cancellationToken: cancellationToken);
    }

    private async Task<Role> GetRoleAsync(Guid roleId, CancellationToken cancellationToken)
    {
        return await _roleRepository.Get(new RoleQueryOptions { IncludeClaims = true })
            .FirstOrDefaultAsync(x => x.Id == roleId, cancellationToken: cancellationToken);
    }

    public async Task AddToRoleAsync(User user, string roleName, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (user == null)
        {
            throw new ArgumentNullException(nameof(user));
        }

        if (string.IsNullOrWhiteSpace(roleName))
        {
            throw new ArgumentException("Role name cannot be null or whitespace.", nameof(roleName));
        }

        var role = await GetRoleAsync(roleName, cancellationToken);
        if (role == null)
        {
            throw new InvalidOperationException("Role not found.");
        }

        await _userRoleRepository.AddUserRoleAsync(user.Id, role.Id);
    }

    public async Task RemoveFromRoleAsync(User user, string roleName, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (user == null)
        {
            throw new ArgumentNullException(nameof(user));
        }

        if (string.IsNullOrWhiteSpace(roleName))
        {
            throw new ArgumentException("Role name cannot be null or whitespace.", nameof(roleName));
        }

        var role = await GetRoleAsync(roleName, cancellationToken);
        if (role == null)
        {
            throw new InvalidOperationException("Role not found.");
        }

        await _userRoleRepository.RemoveUserRoleAsync(user.Id, role.Id);
    }

    public async Task<IList<string>> GetRolesAsync(User user, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (user == null)
        {
            throw new ArgumentNullException(nameof(user));
        }

        var roles = await _userRoleRepository.GetRolesByUserIdAsync(user.Id);
        return roles.Select(r => r.Name).ToList();
    }

    public async Task<bool> IsInRoleAsync(User user, string roleName, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (user == null)
        {
            throw new ArgumentNullException(nameof(user));
        }

        if (string.IsNullOrWhiteSpace(roleName))
        {
            throw new ArgumentException("Role name cannot be null or whitespace.", nameof(roleName));
        }

        var role = await GetRoleAsync(roleName, cancellationToken);
        if (role == null)
        {
            return false;
        }

        return await _userRoleRepository.UserHasRoleAsync(user.Id, role.Id);
    }

    public async Task<IList<User>> GetUsersInRoleAsync(string roleName, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (string.IsNullOrWhiteSpace(roleName))
        {
            throw new ArgumentException("Role name cannot be null or whitespace.", nameof(roleName));
        }

        var role = await GetRoleAsync(roleName, cancellationToken);
        if (role == null)
        {
            return new List<User>();
        }

        var userIds = await _userRoleRepository.GetUserIdsByRoleIdAsync(role.Id);
        var users = new List<User>();

        foreach (var userId in userIds)
        {
            var user = await _userRepository.Get(new UserQueryOptions())
                .FirstOrDefaultAsync(x => x.Id == userId, cancellationToken: cancellationToken);
            if (user != null)
            {
                users.Add(user);
            }
        }

        return users;
    }
}