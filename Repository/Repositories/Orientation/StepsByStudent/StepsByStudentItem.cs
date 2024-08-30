using System;
using System.ComponentModel.DataAnnotations;

namespace Repository.Repositories.Orientation;

public class StepsByStudentItem
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string ContentFileName { get; set; }
    public bool IsCompleted { get; set; }
    public bool IsCurrent { get; set; }
    public string Template { get; set; }
    public int UserId { get; set; }
    public DateTime? CompletedDate { get; set; }
}
