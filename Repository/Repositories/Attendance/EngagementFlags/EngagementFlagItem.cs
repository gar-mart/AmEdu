using System;

using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Attendance.EngagementFlags;

[TableMetaData("Attendance", "EngagementFlags", "EngagementFlag")]
public class EngagementFlagItem: IBaseModel
{
    [FdIgnore]
    public int UserId { get; set; }
    [FdIgnore]
    public int StaffId { get; set; }
    [FdIgnore]
    public DateTime WeekOfDate { get; set; }
    [FdIgnore]
    public int ActualCommunications { get; set; }
    [FdIgnore]
    public int? TargetCommunications { get; set; }
    [FdIgnore]
    public int ActualLiveLessons { get; set; }
    [FdIgnore]
    public int? TargetLiveLessons { get; set; }
    [FdIgnore]
    public decimal ActualCourseHours { get; set; }
    [FdIgnore]
    public decimal? TargetCourseHours { get; set; }
    public bool? ApprovedStatus { get; set; }
    public string RejectedReason { get; set; }
    [FdIgnore]
    public string InterventionReason { get; set; }
    public InterventionLevel? InterventionLevel { get; set; }
}
