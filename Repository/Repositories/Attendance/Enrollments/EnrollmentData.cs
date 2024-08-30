using System;
using System.ComponentModel.DataAnnotations;

namespace Repository.Repositories.Attendance.Enrollments;

public class EnrollmentData
{
    [Key]
    /// <summary>
    /// Maps to <see cref="EnrollmentItem.Id"/>, which is a student ID.
    /// </summary>
    public int Id { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int? PointsAwarded { get; set; }
    public int? PointsPossible { get; set; }
}
