using System.Collections.Generic;

namespace Repository.Repositories.Common.User;

public class UserItem
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string UserName { get; set; }
    public string JobTitle { get; set; }
    public int Id { get; set; }
    public string GoogleId { get; set; }
    public string GradeLevel { get; set; }
    public bool IsStaff { get; set; }
    public bool IsAdmin { get; set; }
    public bool IsMentor { get; set; }
    public bool IsSecondaryMentor { get; set; }
    public bool IsActive { get; set; }
    public bool IsInterventionist { get; set; }
    public bool IsTeacher { get; set; }
    public bool IsReFuelCoordinator { get; set; }
    public string ProfilePicture { get; set; }
    public string AppointmentLink { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    /// <summary>
    /// This property simply returns <see cref="Id"/> for backwards compatibility within this system.
    /// </summary>
    public int UserId => Id;

    public List<string> CounselorAssignments { get; set; } = new List<string>();
}
