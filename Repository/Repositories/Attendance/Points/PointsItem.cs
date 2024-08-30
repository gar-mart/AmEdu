using System;
using System.ComponentModel.DataAnnotations;

using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Attendance.Points;

[TableMetaData("Attendance", "Points", "Points")]
public class PointsItem
{
    [FdIgnore, Key]
    public int Id { get; set; }
    public int UserId { get; set; }
    public int StaffId { get; set; }
    public PointsType Type { get; set; }
    public int Value { get; set; }
    public DateTime Date { get; set; }
    public string Comments { get; set; }
    public PagePointSource? PageSource { get; set; }
    [FdIgnore]
    public UserPointSource? UserSource { get; set; }
}
