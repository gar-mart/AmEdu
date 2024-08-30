using System;

namespace Shared.Buzz.Schemas;

public class Submission
{
    public DateTime CreationDate { get; set; }
    public DateTime ScoredDate { get; set; }
    public int ResponseVersion { get; set; }
    public decimal Achieved { get; set; }
    public decimal Possible { get; set; }
    public string Letter { get; set; }
    public bool Passing { get; set; }
    public decimal RawAchieved { get; set; }
    public decimal RawPossible { get; set; }
    public int Attempts { get; set; }
    public int ScoredVersion { get; set; }
    public int Seconds { get; set; }
    public DateTime SubmittedDate { get; set; }
    public int Version { get; set; }
    public SubmissionUser User { get; set; }

    public class SubmissionUser
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Reference { get; set; }
    }
}
