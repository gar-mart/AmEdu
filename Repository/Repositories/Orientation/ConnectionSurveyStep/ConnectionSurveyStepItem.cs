using System;
using System.ComponentModel.DataAnnotations;

using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Orientation.ConnectionSurveyStep;

public class ConnectionSurveyStepItem
{
    [Key]
    public int UserId { get; set; }
    public string GuardianName { get; set; }
    public PreferredContactMethod WayToContactAsGuardian { get; set; }
    public string GuardianEmailAddress { get; set; }
    public string GuardianPhoneNumber { get; set; } // (xxx) xxx-xxxx
    public PreferredContactTime BestTimeToReachAsGuardian { get; set; } // 1 - Morning  2 - Afternoon  3 - Evening
    public PreferredContactMethod WayToReachAsStudent { get; set; } // 1 - Email  2 - Phone  3 - Text
    public string StudentPhoneNumber { get; set; } // 6-12 grade
    public string StudentEmailAddress { get; set; } // 6-12 grade
    public string SecondaryGuardianName { get; set; }
    public string SecondaryGuardianEmailAddress { get; set; }
    public string SecondaryGuardianPhoneNumber { get; set; }
    public string Interests { get; set; }
    public string ExtraCurricularActivities { get; set; }
    public string HomeAddress { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
    public string NotesAboutMe { get; set; }
    public BroughtToAmEduChoices BroughtToAmEduChoices { get; set; } // this is a bit-wise created value. 1 = Medical Reasons, 2 = Ability to work ahead/above grade level, 4 = Dual Enrollment, 8 = Plan to travel while doing school, 16 = Flexible Schedule, 32 = Preference for Online Learning, 64 = Small School Experience, 128 = Other
    public string BroughtToAmEduOther { get; set; }
    public bool GuardianIsSubscribedToWeeklySnapshotEmail { get; set; } = true;
    public string GuardianRelationship { get; set; }
    public string SecondaryGuardianRelationship { get; set; }
    public DateTime? StudentBirthday { get; set; }
    [FdIgnore]
    public bool IsConfirmed { get; set; } = true;
}
