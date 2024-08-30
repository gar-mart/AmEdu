using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Attendance.Tardiness;

[TableMetaData("Attendance", "Tardies", "Tardiness")]
public class TardinessModel: TardinessItem
{
    public string ClassName { get; set; }
    public string StaffName { get; set; }
    public string UserName { get; set; }
}
