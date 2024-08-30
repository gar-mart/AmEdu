using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Attendance;

[TableMetaData(nameof(Attendance), "InterventionEmailTemplates", "InterventionEmailTemplate")]
public class InterventionEmailTemplateItem
{
    public InterventionLevel InterventionLevel { get; set; }
    public InterventionTemplateEmailFrom EmailFrom { get; set; }
    /// <summary>
    /// Bit-wise value to select more than one recipient
    /// </summary>
    public InterventionTemplateEmailTo EmailTo { get; set; }
    public string EmailSubject { get; set; }
    public string EmailBody { get; set; }
    public bool IncludeEngagementFlagSnapshot { get; set; }
}
