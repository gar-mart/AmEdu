namespace Repository.Repositories.Attendance.EngagementFlags;

public class FlaggedStudentReportItem
{
    public string StudentName { get; set; }
    public string StudentEmail { get; set; }
    public string GradeLevel { get; set; }
    public string MentorName { get; set; }
    public string WeekOfDate { get; set; }
    public InterventionLevel Level { get; set; }
    public InterventionStatus Status { get; set; }
}
