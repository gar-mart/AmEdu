using FD.Base.Shared.Repository.Infrastructure.Database;

using Repository.Repositories.Attendance;
using Repository.Repositories.Common.Student;

namespace Repository.Repositories.Staff.EngagementReport;

[TableMetaData("Staff", "EngagementReport", "EngagementReport")]
public class EngagementReportItem: StudentItem, IClassUserWorkSummary
{
    public bool IsMyStudent { get; set; }
    public int FailingGrades { get; set; }
    public bool AnyTardies { get; set; }
    public int AssignmentsCompleted { get; set; }
    public int AssignmentsCompletedDateRange { get; set; }
    public int AssignmentsInGracePeriod { get; set; }
    public int TotalAssignments { get; set; }
    public int TotalAssignmentsDateRange { get; set; }
    public int AssignmentsCompletedOnTime { get; set; }
    public int NumAbsences { get; set; }
    public int TotalAssignmentsUpUntilEndDate { get; set; }
    public int AssignmentsCompletedUpUntilEndDate { get; set; }
    public int AssignmentsAssignedDateRange { get; set; }
    public int LiveLessonsOffered { get; set; }
}
