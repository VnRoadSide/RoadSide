using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RoadSide.Domain;

namespace RoadSide.Core.Entities;

public class User
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public Gender Gender { get; set; }
    public DateTimeOffset DateOfBirth { get; set; }
    
    [MaxLength(Int32.MaxValue)]
    public string UserName { get; set; }

    [MaxLength(Int32.MaxValue)]
    public string NormalizedUserName { get; set; }

    [MaxLength(Int32.MaxValue)]
    public string Email { get; set; }

    [MaxLength(Int32.MaxValue)]
    public string NormalizedEmail { get; set; }

    public bool EmailConfirmed { get; set; }

    [MaxLength(Int32.MaxValue)]
    public string PasswordHash { get; set; }

    [MaxLength(Int32.MaxValue)] 
    public string PhoneNumber { get; set; } = string.Empty;

    public bool PhoneNumberConfirmed { get; set; }

    public bool TwoFactorEnabled { get; set; }

    [MaxLength(Int32.MaxValue)] 
    public string ConcurrencyStamp { get; set; } = string.Empty;

    [MaxLength(Int32.MaxValue)]
    public string SecurityStamp { get; set; }

    public bool LockoutEnabled { get; set; }

    public DateTimeOffset? LockoutEnd { get; set; }

    public int AccessFailedCount { get; set; }

    public Guid Auth0UserId { get; set; }

    public Guid AzureAdB2CUserId { get; set; }

    public IList<UserTokens> Tokens { get; set; }

    public IList<UserClaims> Claims { get; set; }

    public IList<UserRole> UserRoles { get; set; }

    [MaxLength(Int32.MaxValue)]
    public string AvatarUrl { get; set; } = string.Empty;
    [MaxLength(Int32.MaxValue)]
    public string AddressJson { get; set; } = string.Empty;
    [MaxLength(Int32.MaxValue)]
    public string AdditionalPropertiesJson { get; set; }= string.Empty;
}