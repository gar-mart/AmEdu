using System.Data;
using System.Linq;

using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Helpers;

namespace Repository.Repositories.Attendance.LiveLessonPoints;

public class LiveLessonPointsModel: LiveLessonPointsItem
{
    [FdIgnore]
    public int[] Users { get; set; } = System.Array.Empty<int>();
    public DataTable UserList => Users.Select(id => new { id }).CreateDataTable();
}
