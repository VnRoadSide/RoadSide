using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace RoadSide.Core.Entities;

public class UserLogins : IdentityUserLogin<Guid>
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    public virtual User? Identity { get; set; }
    public DateTimeOffset LoggedOn { get; set; } = DateTimeOffset.Now;
}