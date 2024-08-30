namespace Repository.Repositories.Attendance;

public interface IClassUserWorkSummary
{
    public int AssignmentsCompleted { get; set; }
    public int AssignmentsCompletedDateRange { get; set; }
    public int AssignmentsCompletedOnTime { get; set; }
    public int AssignmentsInGracePeriod { get; set; }
    public int TotalAssignments { get; set; }
    public int TotalAssignmentsDateRange { get; set; }

}
