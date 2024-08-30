using System;

using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Attendance.OnlineHours;

[TableMetaData("Attendance", "OnlineHours", "OnlineHours")]
public class OnlineHoursItem
{
    public int ClassId { get; set; }
    public DateTime Date { get; set; }
    public int UserId { get; set; }
    public decimal Value { get; set; } // hours value
}
