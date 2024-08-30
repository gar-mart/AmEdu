using System.Collections.Generic;

namespace Repository.Repositories.Attendance.Enrollments;

public class EnrollmentModel: EnrollmentItem
{
    public string Name { get; set; }
    public string GradeLevel { get; set; }

    public IEnumerable<EnrollmentData> Data { get; set; } = new List<EnrollmentData>();
}
