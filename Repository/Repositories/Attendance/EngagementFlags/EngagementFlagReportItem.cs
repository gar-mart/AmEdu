using System;

namespace Repository.Repositories.Attendance.EngagementFlags;

public class EngagementFlagReportItem
{
    public string StudentName { get; set; }
    public string StudentId { get; set; }
    public string StudentEmail { get; set; }
    public string GradeLevel { get; set; }
    public string MentorName { get; set; }
    public DateTime WeekOfDate { get; set; }

    public string RejectedReason { get; set; }
}
