using System.ComponentModel.DataAnnotations.Schema;

namespace RoadSide.Core.Entities;

public class RefreshTokens
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    [ForeignKey(nameof(Identity))]
    public int IdentityId { get; set; }
    public virtual User? Identity { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
    public bool IsValid { get; set; }
}