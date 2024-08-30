namespace Repository.Repositories.Attendance.EngagementFlags;

public class FlagResponsesReportItem
{
    public string Label { get; set; }
    public int RejectedCount { get; set; }
    public int OutstandingCount { get; set; }
    public int ApprovedCount { get; set; }
}
