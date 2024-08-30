using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Attendance;

[TableMetaData(nameof(Attendance), "InterventionTruancyForms", "InterventionTruancyForm")]
public class InterventionTruancyFormItem: InterventionTask
{
    public bool MarkedCompleted { get; set; }
}
