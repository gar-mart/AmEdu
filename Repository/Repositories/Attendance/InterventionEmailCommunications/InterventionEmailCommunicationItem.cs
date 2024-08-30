using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Attendance;

[TableMetaData(nameof(Attendance), "InterventionEmailCommunications", "InterventionEmailCommunication")]
public class InterventionEmailCommunicationItem: InterventionTask
{
    public string Email { get; set; }
}
