using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Azure;

using Google;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Calendar.v3;
using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using Google.Apis.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using MimeKit;

using Newtonsoft.Json;

using Repository.Azure;
using Repository.Infrastructure;
using Repository.Infrastructure.Models;
using Repository.Repositories.Attendance;
using Repository.Repositories.Student;
using Repository.Shared.Extensions;

using Shared.Helpers;

using FdAzure = Repository.Infrastructure.Azure;

namespace Api.Controllers;

[Route("api/{controller}/{action}")]
public class DirectoryController: ApiControllerBase
{
    private readonly IOptions<AppConfigurations> _appConfigurations;
    private readonly ErrorLogging _errorLogging;
    private readonly InterventionRepository _interventionRepository;
    private readonly StudentSupportGroupRepository _studentSupportGroupRepository;
    private readonly IJsonHelper _jsonHelper;
    private readonly EntityBlobService _entityBlobService;
    private readonly ILogger<DirectoryController> _logger;
    private readonly InterventionEmailTemplateRepository _interventionEmailTemplateRepository;
    private readonly InterventionEmailCommunicationRepository _interventionEmailCommunicationRepository;

    public DirectoryController(
        IOptions<AppConfigurations> appConfigurations,
        ErrorLogging errorLogging,
        InterventionRepository interventionRepository,
        StudentSupportGroupRepository studentSupportGroupRepository,
        IJsonHelper jsonHelper,
        EntityBlobService entityBlobService,
        ILogger<DirectoryController> logger,
        InterventionEmailTemplateRepository interventionEmailTemplateRepository,
        InterventionEmailCommunicationRepository interventionEmailCommunicationRepository)
    {
        _appConfigurations = appConfigurations;
        _errorLogging = errorLogging;
        _interventionRepository = interventionRepository;
        _studentSupportGroupRepository = studentSupportGroupRepository;
        _jsonHelper = jsonHelper;
        _entityBlobService = entityBlobService;
        _logger = logger;
        _interventionEmailTemplateRepository = interventionEmailTemplateRepository;
        _interventionEmailCommunicationRepository = interventionEmailCommunicationRepository;
    }

    [HttpGet("{emailAddress}")]
    public async Task<IActionResult> ReturnUnreadInboxCount(string emailAddress)
    {
        try
        {
            var request = BuildGmailService(emailAddress).Users.Messages.List("me");
            request.Q = "is:unread";
            request.MaxResults = 99; // don't show more than 99 on FE

            var unreadEmails = await request.ExecuteAsync();
            return Ok(unreadEmails?.Messages?.Count ?? 0);
        }
        catch (Exception ex)
        {
            _errorLogging.NotifyDevelopers(ex, $"{UserContext?.FirstName} {UserContext?.LastName} Unread Inbox Count Error");
            // some student's emails were "not setup for REST API". I'm guessing they could be invalid users? 
            return Ok();
        }
    }

    [HttpGet("{emailAddress}/{startDate}/{endDate}")]
    public async Task<IActionResult> ReturnCalendarEvents(string emailAddress, string startDate, string endDate)
    {
        try
        {
            var request = BuildCalendarService(emailAddress).Events.List(emailAddress);
            request.TimeMin = DateTime.Parse(startDate);
            request.TimeMax = DateTime.Parse(endDate);
            request.MaxResults = 10;
            request.OrderBy = EventsResource.ListRequest.OrderByEnum.StartTime;
            request.SingleEvents = true;

            var events = await request.ExecuteAsync();

            // using this anonymous object to match the definition of Microsoft's return result so that we can be consistent with the return JSON between solutions
            return Ok(events.Items.Select(calendarEvent => new
            {
                isAllDay = calendarEvent.End?.DateTimeRaw == null,
                isOrganizer = calendarEvent.Organizer.Self,
                organizer = new
                {
                    emailAddress = new
                    {
                        name = calendarEvent.Organizer.DisplayName ?? calendarEvent.Organizer.Email
                    }
                },
                start = new
                {
                    dateTime = DateTime.TryParse(calendarEvent.Start.DateTimeRaw ?? string.Empty, out var start)
                        ? start.ToUniversalTime().ToString() // converting to UTC to match Microsoft's implementation
                        : calendarEvent.Start.Date // in this case we have an all day event
                },
                subject = calendarEvent.Summary,
                webLink = calendarEvent.HtmlLink
            }));
        }
        catch (Exception ex)
        {
            _errorLogging.NotifyDevelopers(ex, $"{UserContext?.FirstName} {UserContext?.LastName} Unread Inbox Count Error");
            // some student's emails were "not setup for REST API". I'm guessing they could be invalid users? 
            return Ok();
        }
    }

    [HttpPost, Authorize(Roles = UserRoles.Staff), DisableRequestSizeLimit]
    public async Task<IActionResult> SendCommunicationEmail([FromForm] CommunicationEmailModel model)
    {
        try
        {
            var emails = model.IsPersonalized
                // personalized emails must be "personalized" so we can't send one mass email
                ? model.GetPersonalizedEmails(await _studentSupportGroupRepository.GetByEmailsAsync(model.Recipients.Where(r => !r.IsStaff).Select(r => r.UserEmailAddress)))
                // email isn't personalized, so we can send one mass email
                : new List<CommunicationEmailModel> { model };

            foreach (var email in emails)
            {
                await SendEmail(email, email.RecipientEmails, UserContext.Email, model.FromEmailAddress, email.BccAllRecipients);
            }

            return Ok(true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "{sendCommunicationEmailException}", ex.Message);
            return BadRequest("Your email could not be sent due to the following error: " + ex.Message);
        }
    }

    [HttpPost("{interventionId}"), Authorize(Roles = UserRoles.Staff), DisableRequestSizeLimit]
    public async Task<IActionResult> SendCommunicationEmail(int interventionId, [FromForm] CommunicationEmailModel model)
    {
        var intervention = await _interventionRepository.GetByIdAsync(interventionId);
        var template = (await _interventionEmailTemplateRepository.GetListAsync()).First(t => t.InterventionLevel == intervention.Level);

        await DownloadTemplateAttachments();

        var fromEmailAddress = model.FromEmailAddress;
        var recipients = model.RecipientEmails;

        if (template.IncludeEngagementFlagSnapshot)
        {
            model.Body += "<br><br>" +
                EmailBuilder.BuildHeader($"Engagement Metrics") +
                EmailBuilder.BuildTableHtml(new List<TableCellItem>
                {
                    new("Week"),
                    new("Communications"),
                    new("Live Lessons"),
                    new("Course Hours")
                }, new()
                {
                    new List<TableCellItem>() {
                        new ($"{intervention.EngagementFlag.WeekOfDate.AddDays(-7):M/d/yy}-{intervention.EngagementFlag.WeekOfDate.AddDays(-1):M/d/yy}"),
                        intervention.EngagementFlag.TargetCommunications.HasValue ? new ($"{intervention.EngagementFlag.ActualCommunications} / {intervention.EngagementFlag.TargetCommunications}") : null,
                        intervention.EngagementFlag.TargetLiveLessons.HasValue ? new ($"{intervention.EngagementFlag.ActualLiveLessons} / {intervention.EngagementFlag.TargetLiveLessons}") : null,
                        intervention.EngagementFlag.TargetCourseHours.HasValue ? new ($"{intervention.EngagementFlag.ActualCourseHours} / {intervention.EngagementFlag.TargetCourseHours}") : null,
                    }.Where(c => c != null).ToList()
                });
        }

        await SendEmail(model, recipients, fromEmailAddress);

        await LogEmail();
        return Ok(intervention);

        async Task DownloadTemplateAttachments()
        {
            (IFormFile Attachment, BlobMetadata Blob)[] templateAttachments = await Task.WhenAll(model.Attachments
                .Where(a => a.Length == 0)
                .Select(async a => (a, await _entityBlobService.DownloadEmailTemplateAttachment(intervention.Level, a.FileName))));

            model.Attachments.AddRange(templateAttachments.Select(t =>
            {
                _ = t.Blob.BlobFile.ContentStream.Seek(0, SeekOrigin.Begin);
                return new FormFile(t.Blob.BlobFile.ContentStream, 0, t.Blob.BlobFile.ContentStream.Length, t.Attachment.Name, t.Attachment.FileName)
                {
                    Headers = new HeaderDictionary(),
                    ContentType = t.Attachment.ContentType,
                    ContentDisposition = t.Attachment.ContentDisposition
                };
            }));
        }

        async Task LogEmail()
        {
            if (Debugger.IsAttached && _appConfigurations.Value.IsProduction)
            {
                return; // don't log the communication email when running local
            }

            var attachments = new List<FdAzure.Attachment>();
            foreach (var attachment in model.Attachments.Where(a => a.Length > 0))
            {
                using var stream = attachment.OpenReadStream();
                var url = await _entityBlobService.UploadInterventionEmailCommunicationEmailAttachment(stream, intervention.Id, attachment.FileName, attachment.ContentType);
                attachments.Add(new FdAzure.Attachment { FileName = attachment.FileName, Url = url, ContentType = attachment.ContentType }); // save file name and url
            }
            intervention.EmailCommunication.Email = _jsonHelper.Serialize(new InterventionEmailCommunicationEmail
            {
                FromEmailAddress = model.FromEmailAddress,
                RecipientEmails = model.RecipientEmails.ToArray(),
                Subject = model.Subject,
                Body = model.Body,
                Attachments = attachments.ToArray()
            }).ToString();
            _ = await _interventionEmailCommunicationRepository.UpdateAsync(UserContext, intervention.EmailCommunication);
        }
    }

    private async Task SendEmail(CommunicationEmailModel model, IEnumerable<string> recipients, string fromEmailAddress, string sendAsEmailAddress = null, bool bccAllRecipients = false)
    {
        try
        {
            if (!_appConfigurations.Value.IsProduction || Debugger.IsAttached)
            {
                fromEmailAddress = UserContext.Email;
                model.Subject += $" (redirected from: {string.Join(", ", recipients)})";
                recipients = new List<string> { "fd-AmEdu-dev@freedomdev.com" }; // redirect the email to the development group
            }

            if (_appConfigurations.Value.IsProduction)
            {
                // don't send emails to blacklisted recipients
                recipients = recipients.Where(address => !EmailUtility.ProductionBlacklistedEmailAddresses.Contains(address));
            }

            if (string.IsNullOrWhiteSpace(sendAsEmailAddress))
            {
                sendAsEmailAddress = fromEmailAddress;
            }

            foreach (var batchOfRecipients in recipients.Chunk(100)) // Note: Google's max recipients per email is 100
            {
                var mailMessage = new MailMessage
                {
                    From = new MailAddress(sendAsEmailAddress),
                    Subject = model.Subject,
                    Body = model.Body,
                    IsBodyHtml = true
                }.ConvertInlineImagesIntoContentIdAttachments();

                foreach (var attachment in model.Attachments)
                {
                    if (attachment.Length > 0)
                    {
                        using var attachmentMemoryStream = new MemoryStream();
                        attachment.CopyTo(attachmentMemoryStream);
                        var fileBytes = attachmentMemoryStream.ToArray();
                        mailMessage.Attachments.Add(new Attachment(new MemoryStream(fileBytes), attachment.FileName));
                    }
                }

                foreach (var toAddress in batchOfRecipients)
                {
                    if (bccAllRecipients)
                    {
                        mailMessage.Bcc.Add(toAddress);
                    }
                    else
                    {
                        mailMessage.To.Add(toAddress);
                    }
                }

                var message = MimeMessage.CreateFromMailMessage(mailMessage);
                using var messageMemoryStream = new MemoryStream();
                message.WriteTo(messageMemoryStream);

                var gmailService = BuildGmailService(fromEmailAddress);

                if (!string.Equals(sendAsEmailAddress, fromEmailAddress, StringComparison.OrdinalIgnoreCase))
                {
                    // setup send-as alias
                    SendAs sendAs = null;
                    try
                    {
                        sendAs = await gmailService.Users.Settings.SendAs.Get(fromEmailAddress, sendAsEmailAddress).ExecuteAsync();
                    }
                    catch (GoogleApiException ex) when (ex.HttpStatusCode == HttpStatusCode.NotFound)
                    {
                        /* Swallow resource-not-found (404) exceptions */
                    }
                    sendAs ??= await gmailService.Users.Settings.SendAs.Create(new() { SendAsEmail = sendAsEmailAddress, }, fromEmailAddress).ExecuteAsync();
                }

                var createRequest = gmailService.Users.Drafts.Create(new Draft(), fromEmailAddress, messageMemoryStream, @"message/rfc822");
                var uploadProgress = await createRequest.UploadAsync();

                if (uploadProgress.Exception != null)
                {
                    throw uploadProgress.Exception;
                }

                _ = await gmailService.Users.Drafts.Send(createRequest.ResponseBody, fromEmailAddress).ExecuteAsync();
            }
        }
        catch (Exception ex)
        {
            _errorLogging.NotifyDevelopers(ex, $"{UserContext?.FirstName} {UserContext?.LastName} Email Sending Error");
            throw;
        }
    }

    private GmailService BuildGmailService(string emailAddress = null)
    {
        return new GmailService(new BaseClientService.Initializer
        {
            ApplicationName = "AmEdu Portal",
            HttpClientInitializer = GoogleCredential.FromJson(JsonConvert.SerializeObject(_appConfigurations.Value.GoogleServiceAccountKey))
                .CreateScoped(new string[]
                {
                    GmailService.ScopeConstants.MailGoogleCom,       // sending emails
                    GmailService.ScopeConstants.GmailSettingsBasic,  // updating "send as" setting
                    GmailService.ScopeConstants.GmailSettingsSharing // sending with "send as"
                })
                .CreateWithUser(emailAddress ?? _appConfigurations.Value.EmailSender.FromEmailAddress)
        });
    }

    private CalendarService BuildCalendarService(string emailAddress = null)
    {
        return new CalendarService(new BaseClientService.Initializer
        {
            ApplicationName = "AmEdu Portal",
            HttpClientInitializer = GoogleCredential.FromJson(JsonConvert.SerializeObject(_appConfigurations.Value.GoogleServiceAccountKey))
                .CreateScoped(new string[] { CalendarService.ScopeConstants.Calendar })
                .CreateWithUser(emailAddress ?? _appConfigurations.Value.EmailSender.FromEmailAddress)
        });
    }
}
