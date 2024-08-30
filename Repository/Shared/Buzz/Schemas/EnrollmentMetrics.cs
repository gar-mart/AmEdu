using System;

namespace Shared.Buzz.Schemas;

public class EnrollmentMetrics
{
    public string EnrollmentId { get; set; }
    public decimal Achieved { get; set; }
    public decimal Possible { get; set; }
    public decimal? TeacherAchieved { get; set; }
    public decimal? TeacherPossible { get; set; }
    public decimal? FinalScore { get; set; }
    public string FinalLetter { get; set; }
    public string Letter { get; set; }
    public string TeacherLetter { get; set; }
    public bool Failing { get; set; }
    public bool TeacherFailing { get; set; }
    public int Seconds { get; set; }
    public int CompletedGradable { get; set; }
    public int Graded { get; set; }
    public int Late { get; set; }
    public int Failed { get; set; }
    public int RecentlyFailed { get; set; }
    public DateTime? OldestWorkItem { get; set; }
    public string PaceLight { get; set; }
    public string PaceReason { get; set; }
    public string PerformanceLight { get; set; }
    public DateTime LastDueDateMissed { get; set; }
    public DateTime CalculatedDate { get; set; }
    public int Badges { get; set; }
    public int Understanding { get; set; }
    public int Interest { get; set; }
    public int Effort { get; set; }
    public DateTime? LastSelfAssessDate { get; set; }
    public int PacePast { get; set; }
    public int PaceLate { get; set; }
    public int Objectives { get; set; }
    public int ObjectivesMastered { get; set; }
    public int ObjectivesNotMastered { get; set; }
}
