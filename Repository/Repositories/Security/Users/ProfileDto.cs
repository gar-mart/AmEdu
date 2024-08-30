using System;

namespace Repository.Repositories.Security;

/// <summary>
/// This is a restricted set of user properties for the purpose of updating the user account
/// </summary>
public class ProfileDto
{
    public Guid Id { get; set; }

    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
    public string ConfirmNewPassword { get; set; }
}
