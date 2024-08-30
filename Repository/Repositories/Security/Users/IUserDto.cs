using System;
using System.Collections.Generic;

namespace Repository.Repositories.Security.Users;

/// <summary>
/// This is a restricted set of user proeprties that are available to the client.
/// </summary>
public interface IUserDto
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string UserName { get; set; }
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string FullName { get; }
    public IEnumerable<Guid> SecurityGroupList { get; set; }
    public bool EmailConfirmed { get; set; }
    public bool IsActive { get; set; }
    public string PhoneNumber { get; set; }

    public Guid? ImpersonatingIdentityId { get; set; }
    public IEnumerable<string> Roles { get; set; }
    public IEnumerable<string> CounselorAssignments { get; set; }
    public string GradeLevel { get; set; }


    // Not sure why, but we have to explicitly add the props here to serialize correctly
    public DateTime CreatedDate { get; set; }
    public int? CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
}
