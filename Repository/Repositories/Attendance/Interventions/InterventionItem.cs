using System;
using System.ComponentModel.DataAnnotations;

using FD.Base.Shared.Repository.Infrastructure.Database;

using Shared.Helpers;

namespace Repository.Repositories.Attendance;

[TableMetaData("Attendance", "Interventions", "Intervention")]
public class InterventionItem
{
    [Key]
    public int Id { get; set; }
    /// <summary>Same as <see cref="Id"/>.</summary>
    public int EngagementFlagId { get; set; }
    public int CompletedByUserId { get; set; }
    public DateTime? CompletedDate { get; set; }
    public int GeneratedByUserId { get; set; }
    public DateTime GeneratedDate { get; set; }
    public InterventionLevel Level { get; set; }
    public bool LogOnly { get; set; }
    public SchoolYear SchoolYear { get; set; }
    public InterventionStatus Status { get; set; }
    public int StudentId { get; set; }
}
