using System;

namespace Repository.Repositories.Attendance.Points;

public class PointDetailReportItem
{
    public string StudentName { get; set; }
    public string GradeLevel { get; set; }
    public int LiveLessonPoints { get; set; }
    public int CommunicationPoints { get; set; }
    public int RespectPoints { get; set; }
    public int IntegrityPoints { get; set; }
    public int StewardshipPoints { get; set; }
    public int EngagementPoints { get; set; }
    public int TotalPoints { get; set; }
    public string StudentEmail { get; set; }
    public DateTime DateRangeStart { get; set; }
    public DateTime DateRangeEnd { get; set; }
}
