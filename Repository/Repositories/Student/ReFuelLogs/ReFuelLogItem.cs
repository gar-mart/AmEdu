using System;
using System.ComponentModel.DataAnnotations;

using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Student;

[TableMetaData(nameof(Student), "ReFuelLogs", "ReFuelLog")]
public class ReFuelLogItem: IBaseModel
{
    public int StudentId { get; set; }
    [DataType(DataType.Date)]
    public DateTime Date { get; set; }
    public DateTime CheckedIn { get; set; }
    public DateTime? CheckedOut { get; set; }
}
