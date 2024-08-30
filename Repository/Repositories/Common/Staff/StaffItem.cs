using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Repository.Repositories.Common.Staff;

public class StaffItem
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public bool IsAdmin { get; set; }
    public bool IsMentor { get; set; }
    public string GoogleId { get; set; }
    public bool IsInterventionist { get; set; }
    public bool IsReFuelCoordinator { get; set; }
    public bool IsTeacher { get; set; }
    public int MenteeCount { get; set; }
    public string IntroVideoId { get; set; }
    public string AppointmentLink { get; set; }
    public List<string> MentorGrades { get; set; } = new List<string>();
    public List<string> CounselorGrades { get; set; } = new List<string>();
}


public class StudentsToMentorAssignmentItem
{
    public int MentorId { get; set; }
    public List<int> StudentList { get; set; }
}
