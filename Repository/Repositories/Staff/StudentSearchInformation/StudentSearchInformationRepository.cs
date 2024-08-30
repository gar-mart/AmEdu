using System.Collections.Generic;
using System.Threading.Tasks;

using FD.Base.Shared.Models;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Staff.StudentSearchInformation;

public class StudentSearchInformationRepository: BaseAppRepository<StudentSearchInformationItem>
{
    public StudentSearchInformationRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<StudentSearchInformationRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<IEnumerable<StudentSearchInformationItem>> GetListAsync(IUserContext userContext)
    {
        return base.GetListAsync(userContext);
    }

    public Task<StudentSearchInformationItem> GetByIdAsync(IUserContext userContext, int studentId)
    {
        return base.GetByIdAsync(userContext, studentId);
    }
}
