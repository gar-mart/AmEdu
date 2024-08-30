using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using Repository.Repositories.Orientation;

namespace Repository.Repositories.Common.Student;

public class StudentItem
{
    private bool _hasStudentPicture;

    [Key]
    public int Id { get; set; }
    public long? LincolnLearningId { get; set; }
    public long? FlexPointId { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string GradeLevel { get; set; }
    public string MentorName { get; set; }
    public string MentorAppointmentLink { get; set; }
    public string SecondaryMentorAppointmentLink { get; set; }
    public int MentorId { get; set; }
    public double ProgressPercent { get; set; }
    public int CompletedSteps { get; set; }
    public int TotalSteps { get; set; }
    public int HoursRemaining { get; set; }
    public int MinutesRemaining { get; set; }
    public string MentorEmail { get; set; }
    public DateTime? OrientationStartTime { get; set; }
    public DateTime? OrientationFinishTime { get; set; }
    public string MentorPicture { get; set; }
    public string StudentPicture { get; set; }
    public string StudentEmail { get; set; }
    public string PreferredContactMethod { get; set; }
    public string PreferredContactInfo { get; set; }
    public int? SecondaryMentorId { get; set; }
    public string SecondaryMentorName { get; set; }
    public string SecondaryMentorEmail { get; set; }
    public string SecondaryMentorPicture { get; set; }
    public int CumulativePoints { get; set; }
    public int PointBalance { get; set; }
    public decimal OnlineHoursSpent { get; set; }
    public bool IsActive { get; set; } = true;
    public bool HasStudentPicture
    {
        get => !string.IsNullOrEmpty(StudentPicture) || _hasStudentPicture;
        set => _hasStudentPicture = value;
    }
    public int StewardshipPoints { get; set; }
    public int RespectPoints { get; set; }
    public int EngagementPoints { get; set; }
    public int IntegrityPoints { get; set; }
    public int PointsSpent { get; set; }
    /// <summary>
    /// Week-to-date point balance for the communication point type
    /// </summary>
    public int CommunicationPoints { get; set; }
    /// <summary>
    /// Week-to-date point balance for the live lesson point type
    /// </summary>
    public int LiveLessonPoints { get; set; }
    /// <summary>
    /// Cumulative point balance for the communication point type
    /// </summary>
    public int TotalCommunicationPoints { get; set; }
    /// <summary>
    /// Cumulative point balance for the live lesson point type
    /// </summary>
    public int TotalLiveLessonPoints { get; set; }
    public bool HasAccomodations { get; set; }
    public string Accomodations { get; set; }
}


public class StudentProgressItem
{
    public int TotalSteps { get; set; }
    public int CompletedSteps { get; set; }
    public string GradeLevel { get; set; }
}


public class StudentStepsAndProgressItem
{
    public List<StepsByStudentItem> StudentSteps { get; set; }
    public StudentProgressItem StudentProgress { get; set; }
}
