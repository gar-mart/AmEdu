using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Student;

public class StudentSupportGroupRepository: BaseAppRepository<StudentSupportGroupItem>
{
    public StudentSupportGroupRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<StudentSupportGroupRepository> logger) : base(appConfigurations, logger)
    {
    }

    public Task<IEnumerable<StudentSupportGroupItem>> GetByEmailsAsync(IEnumerable<string> studentEmails)
    {
        return CommandBuilder
            .GetListBuilder()
            .Add(nameof(studentEmails), studentEmails.Select(email => new { email }).CreateDataTable(), DbType.Object)
            .QueryListAsync<StudentSupportGroupItem>();
    }
}
