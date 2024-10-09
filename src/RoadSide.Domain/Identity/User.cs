
namespace RoadSide.Domain;

public class User : JsonBaseEntity<Guid>
{
    public string FullName { get; set; } = string.Empty;
        
    public Gender Gender { get; set; } = Gender.Female;
        
    public DateTimeOffset DateOfBirth { get; set; } = DateTimeOffset.Now;
        
    public string AvatarUrl { get; set; } = string.Empty;
    public Address Address { get; set; }
    public string UserName { get; set; }

    public string Email { get; set; }

    public bool EmailConfirmed { get; set; }

    public string PhoneNumber { get; set; }= string.Empty;

    public bool PhoneNumberConfirmed { get; set; }

    public bool TwoFactorEnabled { get; set; }

    public ICollection<Role> Roles { get; set; }
}

public class CurrentUser
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string UserName { get; set; }
    public ICollection<string> RoleName { get; set; }
    public string Name { get; set; }
    public string Avatar { get; set; }
    public string PhoneNumber { get; set; }
    public Address Address { get; set; }
}