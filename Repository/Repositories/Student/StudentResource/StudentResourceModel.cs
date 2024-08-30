using System.Collections.Generic;

using Repository.Repositories.Student.StudentResourceGradeLevel;

namespace Repository.Repositories.Student.StudentResource;

public class StudentResourceModel: StudentResourceItem
{
    public List<StudentResourceGradeLevelItem> StudentResourceGradeLevels { get; set; } = new List<StudentResourceGradeLevelItem>();
}
