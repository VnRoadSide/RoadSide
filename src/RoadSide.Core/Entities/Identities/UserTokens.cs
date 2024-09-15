using System.ComponentModel.DataAnnotations;

namespace RoadSide.Core.Entities;

public class UserTokens
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }

    [MaxLength(Int32.MaxValue)] 
    public string LoginProvider { get; set; } = string.Empty;

    [MaxLength(Int32.MaxValue)]
    public string TokenName { get; set; } = string.Empty;

    [MaxLength(Int32.MaxValue)] 
    public string TokenValue { get; set; } = string.Empty;
    
    public DateTimeOffset GeneratedTime { get; set; } = DateTimeOffset.Now;

}