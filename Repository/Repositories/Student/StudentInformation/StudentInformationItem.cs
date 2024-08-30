using System;
using System.ComponentModel.DataAnnotations;

using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Student.StudentInformation;

[TableMetaData("Student", "Information", "Information")]
public class StudentInformationItem
{
    [Key]
    public int StudentId { get; set; }
    public string Notes { get; set; }

    // Guardian Contact Information
    public string GuardianName { get; set; }
    public int? PreferredWayToContactGuardian { get; set; }
    public int? BestTimeToReachGuardian { get; set; }
    public string GuardianEmailAddress { get; set; }
    public string GuardianPhoneNumber { get; set; }
    public bool GuardianIsSubscribedToWeeklySnapshotEmail { get; set; } = true;
    public bool SecondaryGuardianIsSubscribedToWeeklySnapshotEmail { get; set; }

    // Student Contact Information
    public string HomeAddress { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
    public string NotesAboutMe { get; set; }
    public int? PreferredWayToContactStudent { get; set; }
    public int? BestTimeToReachStudent { get; set; }
    public string StudentEmailAddress { get; set; }
    public string StudentPhoneNumber { get; set; }

    // Seconary Guardian Contact Information 
    public string SecondaryGuardianName { get; set; }
    public string SecondaryGuardianEmailAddress { get; set; }
    public string SecondaryGuardianPhoneNumber { get; set; }

    public string GuardianRelationship { get; set; }
    public string SecondaryGuardianRelationship { get; set; }
    public DateTime? StudentBirthday { get; set; }
}
