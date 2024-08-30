using System;

using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Attendance;

[TableMetaData(nameof(Attendance), "ClassWork", "ClassWork")]
public class ClassWorkItem
{
    public int ClassId { get; set; }
    public string ItemId { get; set; }
    public string Title { get; set; }
    public string Type { get; set; }
    public DateTime? DueDate { get; set; }
    public int DueDateGrace { get; set; }
    public bool Gradable { get; set; }
}
