using System.ComponentModel.DataAnnotations;

using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Staff;

[TableMetaData(nameof(Staff), "ReFuel", "ReFuel")]
public class ReFuelItem: IAuditModel
{
    [Key, FdIgnore]
    public int Id { get; set; }
    public int MaxOpenPositions { get; set; }
    public int MaxStandbyPositions { get; set; }
    public bool BreakfastOffered { get; set; }
    public bool LunchOffered { get; set; }
}
