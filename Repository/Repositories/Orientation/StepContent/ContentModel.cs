using System.ComponentModel.DataAnnotations;

namespace Repository.Repositories.Orientation;

public abstract class ContentModel
{
    [Key]
    public int Id { get; set; }
    public int StepId { get; set; }
    public int OrderBy { get; set; }
}
