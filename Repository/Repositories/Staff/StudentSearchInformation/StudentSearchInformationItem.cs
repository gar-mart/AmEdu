using System;

using FD.Base.Shared.Repository.Infrastructure.Database;

using Repository.Repositories.Attendance;
using Repository.Repositories.Common.Student;

namespace Repository.Repositories.Staff.StudentSearchInformation;

[TableMetaData("Staff", "StudentSearchInformation", "StudentSearchInformation")]
public class StudentSearchInformationItem: StudentItem
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool IsMyStudent { get; set; }
    public string MediaReleaseParticipation { get; set; }
    public string RefuelParticipation { get; set; }
    public string Hand2HandParticipation { get; set; }
    public bool MissedLastWeeksRequirements { get; set; }
    public string Notes { get; set; }
    public DateTime? EnrollmentDate { get; set; }
    public DateTime? UnenrollmentDate { get; set; }

    // guardian contact information
    public string GuardianName { get; set; }
    public string PreferredWayToContactGuardian { get; set; }
    public string BestTimeToReachGuardian { get; set; }
    public string GuardianEmailAddress { get; set; }
    public string GuardianPhoneNumber { get; set; }
    public bool GuardianIsSubscribedToWeeklySnapshotEmail { get; set; }

    // secondary guardian contact information
    public string SecondaryGuardianName { get; set; }
    public string SecondaryGuardianEmailAddress { get; set; }
    public string SecondaryGuardianPhoneNumber { get; set; }
    public bool SecondaryGuardianIsSubscribedToWeeklySnapshotEmail { get; set; }

    //student contact information
    public string PreferredWayToContactStudent { get; set; }
    public string BestTimeToReachStudent { get; set; }
    public string HomeAddress { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
    public string NotesAboutMe { get; set; }
    public string StudentPersonalEmailAddress { get; set; }
    public string StudentPhoneNumber { get; set; }

    public string GuardianRelationship { get; set; }
    public string SecondaryGuardianRelationship { get; set; }
    public DateTime? StudentBirthday { get; set; }

    public InterventionLevel? InterventionLevel { get; set; }
    public InterventionStatus? InterventionStatus { get; set; }
}
