using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Orientation;

public class StudentPictureDataRepository: BaseAppRepository<StudentPictureDataItem>
{
    public StudentPictureDataRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<StudentPictureDataRepository> logger
        ) : base(appConfigurations, logger) { }

    public async Task<List<StudentPictureDataItem>> ReturnStudentPictures(int? year = null)
    {
        return (await CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Orientation.ReturnStudentPictures")
            .AddModel(new { year })
            .QueryListAsync<StudentPictureDataItem>()).ToList();
    }
}
