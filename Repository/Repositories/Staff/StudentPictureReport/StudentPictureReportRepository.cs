using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Common.Student;

namespace Repository.Repositories.Staff.StudentPictureReport;

public class StudentPictureReportRepository: BaseAppRepository<StudentItem>
{
    public StudentPictureReportRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<StudentPictureReportRepository> logger
        ) : base(appConfigurations, logger) { }

    public async Task<IEnumerable<StudentItem>> GetListAsync(bool includePictures)
    {
        return await CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Staff.ReturnStudentPictureReport")
            .AddModel(new { includePictures })
            .QueryListAsync<StudentItem>();
    }
}
