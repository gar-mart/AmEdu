using System.ComponentModel.DataAnnotations;

using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Orientation;

[TableMetaData("Orientation", "StepIntro", "StepIntro")]
public class IntroStepItem
{
    [Key, FdIgnore]
    public int Id { get; set; }

    public int MentorId { get; set; }
    public string Link { get; set; }
}
