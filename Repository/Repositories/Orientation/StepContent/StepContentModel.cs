using System.Collections.Generic;

using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Orientation;

[TableMetaData("Orientation", "StepContent", "StepContent")]
public class StepContentModel
{
    public StepContentModel() { }
    public StepContentModel((IEnumerable<YouTubeVideoContentItem>, IEnumerable<AppTileMetadataContentItem>, IEnumerable<StudentResourceContentItem>, IEnumerable<ContactContentItem>, IEnumerable<TextImageContentItem>, IEnumerable<SignatureContentItem>, IEnumerable<SystemContentItem>, IEnumerable<QuizContentItem>) content)
    {
        YouTubeVideoContent.AddRange(content.Item1);
        ShortcutContent.AddRange(content.Item2);
        StudentResourceContent.AddRange(content.Item3);
        ContactContent.AddRange(content.Item4);
        TextImageContent.AddRange(content.Item5);
        SignatureContent.AddRange(content.Item6);
        SystemContent.AddRange(content.Item7);
        QuizContent.AddRange(content.Item8);
    }

    public List<YouTubeVideoContentItem> YouTubeVideoContent { get; set; } = new List<YouTubeVideoContentItem>();
    public List<SystemContentItem> SystemContent { get; set; } = new List<SystemContentItem>();
    public List<AppTileMetadataContentItem> ShortcutContent { get; set; } = new List<AppTileMetadataContentItem>();
    public List<ContactContentItem> ContactContent { get; set; } = new List<ContactContentItem>();
    public List<StudentResourceContentItem> StudentResourceContent { get; set; } = new List<StudentResourceContentItem>();
    public List<TextImageContentItem> TextImageContent { get; set; } = new List<TextImageContentItem>();
    public List<SignatureContentItem> SignatureContent { get; set; } = new List<SignatureContentItem>();
    public List<QuizContentItem> QuizContent { get; set; } = new List<QuizContentItem>();
}
