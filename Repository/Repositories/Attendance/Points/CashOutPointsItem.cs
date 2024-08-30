using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Attendance.Points;

[TableMetaData("Attendance", "Points", "Points")]
public class CashOutPointsItem
{
    public int StudentId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int PointBalance { get; set; }
}
