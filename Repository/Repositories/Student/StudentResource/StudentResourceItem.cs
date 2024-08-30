using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Student.StudentResource;

[TableMetaData("Student", "StudentResources", "StudentResource")]
public class StudentResourceItem: IBaseModel
{
    public string Title { get; set; }
    public string Category { get; set; }
    public string Url { get; set; }
    public bool ShowOnStudentDashboard { get; set; }
}
