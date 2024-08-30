using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Attendance.InterventionThresholds;

[TableMetaData("Attendance", "InterventionThresholds", "InterventionThreshold")]
public class InterventionThresholdItem: IBaseModel
{
    [FdIgnore]
    public string Grade { get; set; }
    public int? MinimumCommunicationLogs { get; set; }
    public decimal? MinimumCourseHoursSpent { get; set; }
    public int? MinimumLiveLessons { get; set; }
    public int ExpectedCommunicationLogs { get; set; }
    public int ExpectedLiveLessons { get; set; }
    public int NumberOfRequirements { get; set; }
}
