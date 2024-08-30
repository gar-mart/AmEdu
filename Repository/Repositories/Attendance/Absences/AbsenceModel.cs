using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Attendance.Absences;

[TableMetaData("Attendance", "Absence", "Absences")]
public class AbsenceModel: AbsenceItem
{
    public string UserName { get; set; }
}
