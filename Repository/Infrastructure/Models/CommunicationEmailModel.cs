using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Microsoft.AspNetCore.Http;

using Repository.Repositories.Staff;
using Repository.Repositories.Student;

namespace Repository.Infrastructure.Models;

public class CommunicationEmailModel
{
    public static readonly string[] PersonalizationTokens = new string[]
    {
        "{student_first_name}",
        "{student_last_name}",
        "{guardian_first_name}",
        "{guardian_last_name}",
        "{mentor_first_name}",
        "{mentor_last_name}"
    };

    public string FromEmailAddress { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
    public bool BccAllRecipients { get; set; }
    public List<CommunicationListEntryModel> Recipients { get; set; } = new List<CommunicationListEntryModel>();
    public List<string> AdditionalRecipients { get; set; } = new List<string>();
    public List<IFormFile> Attachments { get; set; } = new List<IFormFile>();
    public IEnumerable<string> RecipientEmails
    {
        get
        {
            var uniqueEmails = new HashSet<string>(StringComparer.InvariantCultureIgnoreCase);
            foreach (var recipient in Recipients)
            {
                if (recipient.IncludeGuardian1 && !string.IsNullOrEmpty(recipient.GuardianEmailAddress))
                {
                    _ = uniqueEmails.Add(recipient.GuardianEmailAddress);
                }

                if (recipient.IncludeGuardian2 && !string.IsNullOrEmpty(recipient.SecondaryGuardianEmailAddress))
                {
                    _ = uniqueEmails.Add(recipient.SecondaryGuardianEmailAddress);
                }

                if (recipient.IncludeStudent && !recipient.IsStaff && !string.IsNullOrEmpty(recipient.UserEmailAddress))
                {
                    _ = uniqueEmails.Add(recipient.UserEmailAddress);
                }

                if (recipient.IncludeStaff && recipient.IsStaff && !string.IsNullOrEmpty(recipient.UserEmailAddress))
                {
                    _ = uniqueEmails.Add(recipient.UserEmailAddress);
                }

                if (recipient.IncludeMentor && !string.IsNullOrEmpty(recipient.MentorEmail))
                {
                    _ = uniqueEmails.Add(recipient.MentorEmail);
                }
            }

            foreach (var recipient in AdditionalRecipients.Distinct())
            {
                _ = uniqueEmails.Add(recipient);
            }

            return uniqueEmails;
        }
    }
    public bool IsPersonalized => !string.IsNullOrEmpty(Body) && PersonalizationTokens.Any(Body.Contains);

    public CommunicationEmailModel() { }
    public CommunicationEmailModel(CommunicationEmailModel copy) : this()
    {
        FromEmailAddress = copy.FromEmailAddress;
        Subject = copy.Subject;
        Body = copy.Body;
        BccAllRecipients = copy.BccAllRecipients;
        Attachments.AddRange(copy.Attachments);
        Recipients.AddRange(copy.Recipients);
        AdditionalRecipients.AddRange(copy.AdditionalRecipients);
    }

    public IEnumerable<CommunicationEmailModel> GetPersonalizedEmails(IEnumerable<StudentSupportGroupItem> groups)
    {
        return groups
            .Select(group =>
            {
                var email = new CommunicationEmailModel(this);
                email.AdditionalRecipients.Clear();
                email.Recipients.Clear();
                email.Recipients.AddRange(Recipients
                    // first narrow down the recipient group by the student
                    .Where(r => r.UserEmailAddress == group.StudentEmail)
                    // next, add all expected recipients based on student group and inclusion flags
                    .Where(r =>
                        r.IncludeStudent && r.UserEmailAddress == group.StudentEmail
                        || r.IncludeGuardian1 && r.GuardianEmailAddress == group.GuardianEmail
                        || r.IncludeGuardian2 && r.SecondaryGuardianEmailAddress == group.SecondaryGuardianEmail
                        || r.IncludeMentor && r.MentorEmail == group.MentorEmail));

                foreach (var token in PersonalizationTokens)
                {
                    switch (token)
                    {
                        case "{student_first_name}":
                            if (!string.IsNullOrEmpty(group.StudentFirstName))
                            {
                                email.Body = email.Body.Replace(token, HttpUtility.HtmlEncode(group.StudentFirstName));
                            }
                            break;
                        case "{student_last_name}":
                            if (!string.IsNullOrEmpty(group.StudentLastName))
                            {
                                email.Body = email.Body.Replace(token, HttpUtility.HtmlEncode(group.StudentLastName));
                            }
                            break;
                        case "{guardian_first_name}":
                            if (!string.IsNullOrEmpty(group.GuardianFirstName))
                            {
                                email.Body = email.Body.Replace(token, HttpUtility.HtmlEncode(group.GuardianFirstName));
                            }
                            break;
                        case "{guardian_last_name}":
                            if (!string.IsNullOrEmpty(group.GuardianLastName))
                            {
                                email.Body = email.Body.Replace(token, HttpUtility.HtmlEncode(group.GuardianLastName));
                            }
                            break;
                        case "{mentor_first_name}":
                            if (!string.IsNullOrEmpty(group.MentorFirstName))
                            {
                                email.Body = email.Body.Replace(token, HttpUtility.HtmlEncode(group.MentorFirstName));
                            }
                            break;
                        case "{mentor_last_name}":
                            if (!string.IsNullOrEmpty(group.MentorLastName))
                            {
                                email.Body = email.Body.Replace(token, HttpUtility.HtmlEncode(group.MentorLastName));
                            }
                            break;
                    }
                }

                return email;
            }).Append(GetNonPersonalizableEmail()).Where(e => e != null);
    }

    private CommunicationEmailModel GetNonPersonalizableEmail()
    {
        var model = new CommunicationEmailModel(this);

        // clear the recipients so that only staff members are added
        model.Recipients.Clear();
        model.Recipients.AddRange(Recipients.Where(r => r.IsStaff && r.IncludeStaff));

        return model.RecipientEmails.Any() ? model : null;
    }
}
