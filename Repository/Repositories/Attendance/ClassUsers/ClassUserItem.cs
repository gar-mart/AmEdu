using System;

using FD.Base.Shared.Repository.Infrastructure.Database;

using Shared.Buzz.Schemas;

namespace Repository.Repositories.Attendance.ClassUsers;

[TableMetaData("Attendance", "ClassUsers", "ClassUser")]
public class ClassUserItem
{
    public int ClassId { get; set; }
    public int UserId { get; set; }
    public string Score { get; set; }
    public decimal ScoreAchieved { get; set; }
    public decimal ScorePossible { get; set; }
    public int TotalSecondsSpentOnline { get; set; }
    public EnrollmentStatus Status { get; set; }

    // used in import
    public int ConnexusId { get; set; }
    public int LincolnLearningId { get; set; }
    public int FlexPointId { get; set; }
    [FdIgnore]
    public DateTime AsOfDate { get; set; }
}
