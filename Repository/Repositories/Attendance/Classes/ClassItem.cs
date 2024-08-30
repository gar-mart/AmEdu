using System;

using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Attendance.Classes;

[TableMetaData("Attendance", "Classes", "Class")]
public class ClassItem: IBaseModel
{
    public string Name { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public long? ConnexusId { get; set; }
    public long? LincolnLearningId { get; set; }
    public long? FlexPointId { get; set; }
}
