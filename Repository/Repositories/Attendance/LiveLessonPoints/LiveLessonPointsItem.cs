using System;

using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Attendance.LiveLessonPoints;

[TableMetaData("Attendance", "LiveLessonPoints", "LiveLessonPoints")]
public class LiveLessonPointsItem
{
    public DateTime Date { get; set; }
    public int StaffId { get; set; }
    public int ClassId { get; set; }
    [FdIgnore]


    public int UserId { get; set; }
    [FdIgnore]


    public DateTime CreatedDate { get; set; }
}
