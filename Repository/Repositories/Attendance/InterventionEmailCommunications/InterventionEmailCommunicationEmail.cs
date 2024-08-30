using Repository.Infrastructure;

namespace Repository.Repositories.Attendance;

public class InterventionEmailCommunicationEmail
{
    public string FromEmailAddress { get; set; }
    public string[] RecipientEmails { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
    public Attachment[] Attachments { get; set; }
}
