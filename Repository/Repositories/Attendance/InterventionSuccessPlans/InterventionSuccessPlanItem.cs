using System;

using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Attendance;

[TableMetaData(nameof(Attendance), "InterventionSuccessPlans", "InterventionSuccessPlan")]
public class InterventionSuccessPlanItem: InterventionTask
{
    public bool SuccessPlanNotCreated { get; set; }
    public DateTime? SuccessPlanCreatedDate { get; set; }
}
