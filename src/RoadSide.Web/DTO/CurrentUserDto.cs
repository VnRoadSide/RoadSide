using RoadSide.Domain;

namespace RoadSide.Web.DTO;

public class CurrentUserDto
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string UserName { get; set; }
    public IList<string> RoleName { get; set; }
    public string Name { get; set; }
    public string Avatar { get; set; }
    public string PhoneNumber { get; set; }
}