using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Student.StudentResourceGradeLevel;

using Shared.Extensions;
using Shared.Extensions.Tasks;

namespace Repository.Repositories.Student.StudentResource;

public class StudentResourceRepository: BaseAppRepository<StudentResourceItem, StudentResourceModel>
{
    public StudentResourceRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<StudentResourceRepository> logger
        ) : base(appConfigurations, logger) { }

    public async Task<IEnumerable<StudentResourceModel>> GetListAsync()
    {
        return await CommandBuilder
            .GetListBuilder()
            .QueryMultipleAsync<StudentResourceModel, StudentResourceGradeLevelItem>()
            .Then(x => x.Item1
            .ManyJoin(x.Item2, a => a.Id, b => b.StudentResourceId, (a, b) => a.StudentResourceGradeLevels.AddRange(b)));
    }

    public async Task<int> AddStudentResource(StudentResourceModel studentResourceModel)
    {
        var gradeLevels = studentResourceModel.StudentResourceGradeLevels.Select(x => x.GradeLevel).ToList();

        return await CommandBuilder
            .InsertBuilder()
            .ForStoredProcedure("Student.CreateStudentResource")
            .AddModel<StudentResourceItem>(studentResourceModel)
            .Add(nameof(gradeLevels), gradeLevels.Select(x => new { x }).CreateDataTable(), dbType: DbType.Object)
            .ExecuteCreateAsync();
    }

    public async Task<bool> UpdateStudentResourceGradeLevels(int studentResourceId, IEnumerable<string> gradeLevels)
    {
        return await CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Student.UpdateStudentResourceGradeLevels")
            .AddModel(new { studentResourceId })
            .Add(nameof(gradeLevels), gradeLevels.Select(x => new { x }).CreateDataTable(), dbType: DbType.Object)
            .ExecuteCommonAsync();
    }

    public async Task<bool> UpdateStudentResourceAndMetadata(StudentResourceModel studentResourceModel)
    {
        var gradeLevels = studentResourceModel.StudentResourceGradeLevels.Select(x => x.GradeLevel);

        return await CommandBuilder
            .UpdateBuilder()
            .ForStoredProcedure("Student.UpdateStudentResourceAndMetadata")
            .AddModel<StudentResourceItem>(studentResourceModel)
            .Add(nameof(gradeLevels), gradeLevels.Select(x => new { x }).CreateDataTable(), dbType: DbType.Object)
            .ExecuteCommonAsync();
    }


    public async Task<bool> DeleteStudentResource(int id)
    {
        return await CommandBuilder
            .UpdateBuilder()
            .ForStoredProcedure("Student.DeleteStudentResource")
            .AddModel(new { id })
            .ExecuteCommonAsync();
    }

    public async Task<IEnumerable<StudentResourceItem>> ReturnStudentResourcesBySearch(string searchTerm)
    {
        return await CommandBuilder
            .GetBySearchBuilder()
            .Add(nameof(searchTerm), searchTerm)
            .QueryListAsync<StudentResourceItem>();
    }

    public async Task<StudentResourceItem> ReturnStudentResourceById(int id)
    {
        return await CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Student.ReturnStudentResourceById")
            .AddModel(new { id })
            .QuerySingleAsync<StudentResourceItem>();
    }
}
