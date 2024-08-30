using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Text.RegularExpressions;

namespace Repository.Shared.Extensions;
public static class MailMessageExtensions
{
    /// <summary>
    /// Gmail doesn't handle base64 encoded inline images well. This function will convert these images into cid: encoded images. 
    /// </summary>
    public static MailMessage ConvertInlineImagesIntoContentIdAttachments(this MailMessage mailMessage)
    {
        var regexImgSrc = @"<img[^>]*?src\s*=\s*[""']?([^'"" >]+?)[ '""][^>]*?>";
        var matchesImgSrc = Regex.Matches(mailMessage.Body, regexImgSrc, RegexOptions.IgnoreCase | RegexOptions.Singleline);

        var linkedResources = new List<LinkedResource>();

        foreach (Match m in matchesImgSrc)
        {
            var src = m.Groups[1].Value;
            var base64ByteArray = Convert.FromBase64String(string.Join(',', src.Split(',').Skip(1)));

            var isPng = src.StartsWith("data:image/png;");

            var linkedResource = new LinkedResource(new MemoryStream(base64ByteArray), new ContentType(isPng ? "image/png" : "image/jpeg"))
            {
                ContentId = Guid.NewGuid().ToString(),
                TransferEncoding = TransferEncoding.Base64
            };

            mailMessage.Attachments.Add(new Attachment(new MemoryStream(base64ByteArray), new ContentType
            {
                MediaType = MediaTypeNames.Image.Jpeg, // there is no "Png" equivalent
                Name = $"{Guid.NewGuid()}.{(isPng ? ".png" : ".jpg")}",
            })
            {
                ContentId = linkedResource.ContentId
            });

            mailMessage.Body = new Regex(Regex.Escape(m.ToString())).Replace(mailMessage.Body, $"<img src='cid:{linkedResource.ContentId}'/>", 1);

            linkedResources.Add(linkedResource);
        }

        if (linkedResources.Any())
        {
            var aView = AlternateView.CreateAlternateViewFromString(mailMessage.Body, new ContentType("text/html"));
            foreach (var linkedResource in linkedResources)
            {
                aView.LinkedResources.Add(linkedResource);
            }
            mailMessage.AlternateViews.Add(aView);
        }

        return mailMessage;
    }
}
