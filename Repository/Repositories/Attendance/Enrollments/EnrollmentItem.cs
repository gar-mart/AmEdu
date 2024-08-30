using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;

using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Helpers;

namespace Repository.Repositories.Attendance.Enrollments;

[TableMetaData("Attendance", "Enrollments", "Enrollment")]
public class EnrollmentItem
{
    public const string StudentFirstNameHeader = "Student First Name";
    public const string StudentLastNameHeader = "Student Last Name";
    public const string EnrollmentDateHeader = "Enrollment Date";
    public const string UnenrollmentDateHeader = "Unenrollment Date";
    public const string UICNumberHeader = "UIC Number";

    #region Properties from Import Enrollment Data
    [FdIgnore]


    public string FirstName { get; set; }
    [FdIgnore]


    public string LastName { get; set; }
    public DateTime? EnrollmentDate { get; set; }
    public DateTime? UnenrollmentDate { get; set; }

    public long? UICNumber { get; set; }
    [FdIgnore]


    public bool HasData => !string.IsNullOrEmpty(FirstName) || !string.IsNullOrEmpty(LastName) || EnrollmentDate.HasValue || UnenrollmentDate.HasValue || UICNumber > 0;
    [FdIgnore]


    public bool IsIncomplete => HasData && (string.IsNullOrEmpty(FirstName) || string.IsNullOrEmpty(LastName) || UICNumber == 0);
    #endregion

    #region Properties Matched In Attendance.MatchAndReturnEnrollments
    [Key]
    public int Id { get; set; }
    [FdIgnore]


    public string Email { get; set; }
    [FdIgnore]


    public DateTime? CurrentEnrollmentDate { get; set; }
    [FdIgnore]


    public DateTime? CurrentUnenrollmentDate { get; set; }
    [FdIgnore]


    public long? CurrentUICNumber { get; set; }
    [FdIgnore]


    public bool HasMultipleMatches { get; set; }
    #endregion

    public static DataTable ToTVP(IEnumerable<EnrollmentItem> enrollments)
    {
        return enrollments.Select(e => new
        {
            e.FirstName,
            e.LastName,
            e.EnrollmentDate,
            e.UnenrollmentDate,
            e.UICNumber,
            e.Id
        }).CreateDataTable();
    }

    public override string ToString()
    {
        static string FormatDate(DateTime? date)
        {
            return date.HasValue ? date.Value.ToShortDateString() : string.Empty;
        }

        return $"{StudentFirstNameHeader}: {FirstName}, {StudentLastNameHeader}: {LastName}, {EnrollmentDateHeader}: {FormatDate(EnrollmentDate)}, {UnenrollmentDateHeader}: {FormatDate(UnenrollmentDate)}, {UICNumberHeader}: {UICNumber}";
    }
}
