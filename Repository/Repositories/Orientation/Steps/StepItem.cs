using System;
using System.ComponentModel.DataAnnotations;

using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Orientation;

[TableMetaData(nameof(Orientation), "Steps", "Step")]
public class StepItem
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string ContentFileName { get; set; }
    public int OrderBy { get; set; }
    public DateTime? ActivateDate { get; set; }
    public DateTime? ExpirationDate { get; set; }
    public bool IsActive { get; set; }
}
