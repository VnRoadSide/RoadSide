using AutoMapper;
using RoadSide.Core.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RoadSide.Domain;
using User = RoadSide.Core.Entities.User;

namespace RoadSide.Infrastructure.Identity;
public class AppUserManager : UserManager<User>
{
    private readonly IMapper _mapper;
    private readonly ICoreDbContext _context;
    private readonly ILogger<AppUserManager> _logger;

    public AppUserManager(IUserStore<User> store,
        IOptions<IdentityOptions> optionsAccessor,
        IPasswordHasher<User> passwordHasher,
        IEnumerable<IUserValidator<User>> userValidators,
        IEnumerable<IPasswordValidator<User>> passwordValidators,
        ILookupNormalizer keyNormalizer,
        IdentityErrorDescriber errors,
        IServiceProvider services,
        ILogger<AppUserManager> logger, IMapper mapper
        , ICoreDbContext context) : base(store, optionsAccessor, passwordHasher, userValidators,
        passwordValidators, keyNormalizer,
        errors, services, logger)
    {
        _mapper = mapper;
        _context = context;
        _logger = logger;
    }

    public async Task<RoadSide.Domain.User> FindUserByCredentials(string credential)
    {
        var account = await FindByNameAsync(credential) ?? await FindByEmailAsync(credential);
        return new Domain.User
        {
            Email = account?.Email,
            UserName = account?.UserName,
            PhoneNumber = account?.PhoneNumber,
            TwoFactorEnabled = account?.TwoFactorEnabled ?? false,
            EmailConfirmed = account?.EmailConfirmed ?? false
        };
    }

    public async Task<IdentityResult> CreateAsync(RoadSide.Domain.User user)
    {
        // Mapping domain user to entity user
        var appUser = _mapper.Map<User>(user);
        
        // Attempt to create the user
        var result = await base.CreateAsync(appUser, user.Password);
        if (result.Succeeded)
        {
            try
            {
                // Save the changes to the database
                _context.Users.Add(appUser);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException != null)
                    _logger.LogError($"Error while saving to database: {ex.InnerException.Message}");
                else
                    _logger.LogError($"Error while saving to database: {ex.Message}");

                return IdentityResult.Failed(new IdentityError { Description = $"Error saving user. Please check the data and try again." });
            }

        }
        else
        {
            // Log each error returned by the Identity result
            foreach (var error in result.Errors)
            {
                _logger.LogError($"Error creating user: {error.Description}");
            }
        }
        return result;
    }


    public async Task<(SignInResult, Domain.User)> CheckPasswordSignInAsync(LoginInfo info, bool lockoutOnFailure)
    {
        var user = await FindByNameAsync(info.Credential) ?? await FindByEmailAsync(info.Credential);
        if (user == null)
        {
            throw new ArgumentNullException(nameof(user));
        }

        var passwordVerificationResult = PasswordHasher.VerifyHashedPassword(user, user.PasswordHash, info.Password);
        if (passwordVerificationResult == PasswordVerificationResult.Failed)
        {
            if (lockoutOnFailure)
            {
                await AccessFailedAsync(user);
            }
            return (SignInResult.Failed, null);
        }

        if (passwordVerificationResult == PasswordVerificationResult.SuccessRehashNeeded)
        {
            await UpdatePasswordHash(user, info.Password, validatePassword: false);
            await UpdateAsync(user);
        }

        if (lockoutOnFailure)
        {
            await ResetAccessFailedCountAsync(user);
        }

        return (SignInResult.Success, new Domain.User
        {
            Email = user.Email,
            UserName = user.UserName,
            PhoneNumber = user.PhoneNumber,
            TwoFactorEnabled = user.TwoFactorEnabled,
            EmailConfirmed = user.EmailConfirmed
        });
    }

}