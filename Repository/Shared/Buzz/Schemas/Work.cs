using System;

namespace Shared.Buzz.Schemas;

public class Work
{
    public string EnrollmentId { get; set; }
    public string UserId { get; set; }
    public string EntityId { get; set; }
    public string ItemId { get; set; }
    public string ItemTitle { get; set; }
    public string WorkId { get; set; }
    public DateTime SubmittedDate { get; set; }
    public DateTime ScoredDate { get; set; }
    public decimal PointsPossible { get; set; }
    public decimal PointsAchieved { get; set; }
}
