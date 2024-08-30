using System;

namespace Repository.Repositories.Attendance.Points;

public class FlagsGeneratedReportItem
{
    public string Label { get; set; }
    public decimal FlagCount { get; set; }
    public DateTime Date { get; set; }
}
