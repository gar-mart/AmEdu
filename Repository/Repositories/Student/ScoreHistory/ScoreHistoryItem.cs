using System;

using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Student.ScoreHistory;

[TableMetaData("Student", "ScoreHistory", "ScoreHistory")]
public class ScoreHistoryItem
{
    [FdIgnore]
    public int StudentId { get; set; }
    [FdIgnore]
    public int ClassId { get; set; }
    [FdIgnore]
    public decimal ScoreAchieved { get; set; }
    [FdIgnore]
    public decimal ScorePossible { get; set; }
    [FdIgnore]
    public string Score { get; set; } // calculated in database as a percentage
    [FdIgnore]
    public DateTime AsOfDate { get; set; } // DATE db type
    [FdIgnore]
    public int TotalSecondsSpentOnline { get; set; }
}
