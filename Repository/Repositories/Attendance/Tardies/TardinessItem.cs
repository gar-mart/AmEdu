using System;

using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Attendance.Tardiness;

[TableMetaData("Attendance", "Tardies", "Tardiness")]
public class TardinessItem: IAuditModel
{
    public int ClassId { get; set; }
    public int UserId { get; set; }
    public int StaffId { get; set; }
    public DateTime Date { get; set; }
    public string Comment { get; set; }
    /// <summary>
    /// Describes how the user was tardy.
    /// <remarks>
    /// <c>null</c> means the user was not tardy.
    /// </remarks>
    /// </summary>
    public Tardy? Type { get; set; }
}

public enum Tardy
{
    Late = 1,
    InAndOut = 2,
    LeftEarly = 3,
    Disengaged = 4,
}
