namespace RoadSide.Domain;

public class Authorization
{
    public string AccessToken { get; set; } = string.Empty;
    public int ExpiresIn { get; set; }
    public User Profile { get; set; }
}