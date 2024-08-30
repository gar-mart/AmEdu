using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

using Shared.Buzz;
using Shared.Buzz.Schemas;

namespace Repository.Repositories.Attendance.Classes;

public class ClassRepository: BaseAppRepository<ClassItem, ClassModel>
{
    public ClassRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<ClassRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<bool> CreateAsync(Course course, ApiType apiType)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.CreateClass")
            .AddModel(new
            {
                connexusId = apiType == ApiType.Connexus ? int.Parse(course.Id) : (int?)null,
                lincolnLearningId = apiType == ApiType.LincolnLearning ? int.Parse(course.Id) : (int?)null,
                flexPointId = apiType == ApiType.FlexPoint ? int.Parse(course.Id) : (int?)null,
                name = course.Title,
                course.StartDate,
                course.EndDate
            })
            .ExecuteCommonAsync();
    }

    public Task<IEnumerable<ClassModel>> GetListAsync(DateTime date, string searchTerm, int staffId)
    {
        return GetListAsync(new { date, searchTerm, staffId });
    }

    public Task<bool> MarkExternalDataForDelete(ApiType apiType)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.MarkExternalDataForDelete")
            .AddModel(new { apiType })
            .ExecuteCommonAsync();
    }

    public Task<bool> DeleteMarkedExternalData(ApiType apiType)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.DeleteMarkedExternalData")
            .AddModel(new { apiType })
            .ExecuteCommonAsync();
    }
}
