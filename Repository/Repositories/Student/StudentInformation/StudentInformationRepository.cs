using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Student.StudentInformation;

public class StudentInformationRepository: BaseAppRepository<StudentInformationItem, StudentInformationModel>
{
    public StudentInformationRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<StudentInformationRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<bool> UnsubscribeFromWeeklySnapshotEmailAsync(string googleId)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Student.UnsubscribeFromWeeklySnapshotEmail")
            .Add(new { googleId })
            .ExecuteCommonAsync();
    }

    public Task<IEnumerable<StudentInformationModel>> GetListAsync(bool? guardianIsSubscribedToWeeklySnapshotEmail = null, bool? isActive = null)
    {
        return GetListAsync(new { guardianIsSubscribedToWeeklySnapshotEmail, isActive });
    }

    public Task<StudentInformationModel> GetByIdAsync(int studentId)
    {
        return base.GetByIdAsync(studentId);
    }

    public Task<bool> UpdateAsync(StudentInformationItem item)
    {
        return base.UpdateAsync(item);
    }
}
