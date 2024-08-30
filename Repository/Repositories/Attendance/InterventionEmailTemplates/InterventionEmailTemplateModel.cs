using System.Collections.Generic;

namespace Repository.Repositories.Attendance;

public class InterventionEmailTemplateModel: InterventionEmailTemplateItem
{
    public List<InterventionEmailTemplateAttachment> AttachmentList { get; set; } = new List<InterventionEmailTemplateAttachment>();
    public List<InterventionEmailTemplateRecipient> Recipients { get; set; } = new List<InterventionEmailTemplateRecipient>();

    public string EmailFromAddress { get; set; }
}
