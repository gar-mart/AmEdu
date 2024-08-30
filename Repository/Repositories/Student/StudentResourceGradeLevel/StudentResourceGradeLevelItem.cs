using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Student.StudentResourceGradeLevel;

[TableMetaData("Student", "StudentResourceGradeLevel", "StudentResourceGradeLevel")]
public class StudentResourceGradeLevelItem
{
    public int StudentResourceId { get; set; }

    public string GradeLevel { get; set; }
}
