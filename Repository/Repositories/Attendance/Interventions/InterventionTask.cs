using System;
using System.Collections.Generic;

using FD.Base.Shared.Repository.Infrastructure.Database;

using Repository.Infrastructure;

namespace Repository.Repositories.Attendance;

public abstract class InterventionTask
{
    [FdIgnore]
    public int CompletedByUserId { get; set; }
    [FdIgnore]
    public string CompletedByUserName { get; set; }
    [FdIgnore]
    public DateTime? CompletedDate { get; set; }
    public int InterventionId { get; set; }
    public bool IsCompleted { get; set; }

    [FdIgnore]
    public List<IAttachment> Attachments { get; set; } = new List<IAttachment>();
}
