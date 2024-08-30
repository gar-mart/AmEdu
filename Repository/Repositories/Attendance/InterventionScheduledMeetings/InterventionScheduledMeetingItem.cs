using System;

using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Attendance;

[TableMetaData(nameof(Attendance), "InterventionScheduledMeetings", "InterventionScheduledMeeting")]
public class InterventionScheduledMeetingItem: InterventionTask
{
    public DateTime? DateOfMeeting { get; set; }
    public InterventionScheduledMeetingStatus? Status { get; set; }
}
