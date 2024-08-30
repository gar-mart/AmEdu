using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using Repository.Repositories.Orientation.ConnectionSurveyStep;

namespace Repository.Repositories.Orientation.OrientationReport;

public class OrientationReportItem
{
    public List<StudentOrientationResponseItem> StudentOrientationResponses { get; set; }
    public List<StudentSemesterElectiveItem> StudentSemesterElectives { get; set; }
}

public class StudentSemesterElectiveItem
{
    public int StudentId { get; set; }
    public short SemesterNumber { get; set; }
    public string ElectiveName { get; set; }
}

public class StudentOrientationResponseItem: ConnectionSurveyStepItem
{
    [Key]
    public int Id => StudentId; // compatibility with StudentItem
    public int StudentId { get; set; }
    public string Name { get; set; }
    public string GradeLevel { get; set; }
    public DateTime? OrientationStartTime { get; set; }
    public string StudentEmail { get; set; }
    public string MentorName { get; set; }
}
