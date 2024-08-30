using FD.Base.Shared.Models;

namespace AutomatedTests;

/// <summary>
/// User Context for testing
/// </summary>
public class TestUserContext: IUserContext
{
    public int TenantId { get; set; }
    public int UserId { get; set; }
    public string TimeZoneId { get; set; }
    public string Email { get; set; }

    public object CommonParameters()
    {
        return new { currentUserId = UserId, currentUserTimeZoneId = TimeZoneId };
    }
}
