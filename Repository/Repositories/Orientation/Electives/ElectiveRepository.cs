using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Orientation.ElectiveGroupChoices;

using Shared.Extensions;
using Shared.Extensions.Tasks;

namespace Repository.Repositories.Orientation.Electives;

public class ElectiveRepository: BaseAppRepository<ElectiveItem, ElectiveModel>
{
    public ElectiveRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<ElectiveRepository> logger) : base(appConfigurations, logger) { }

    public Task<IEnumerable<ElectiveModel>> GetListAsync()
    {
        return CommandBuilder
            .GetListBuilder()
            .QueryMultipleAsync<ElectiveModel, SemesterElectiveItem, ElectiveGroupChoiceItem>()
            .Then(x => x.Item1
            .ManyJoin(x.Item2, a => a.Id, b => b.ElectiveId, (a, b) => a.SemesterElectives.AddRange(b))
            .ManyJoin(x.Item3, a => a.Id, c => c.ElectiveId, (a, c) => a.ElectiveGroupChoices.AddRange(c)));
    }

    public Task<IEnumerable<ElectiveModel>> ReturnElectivesBySearch(string searchTerm)

    {
        return CommandBuilder
            .GetBySearchBuilder()
            .Add(nameof(searchTerm), searchTerm)
            .QueryMultipleAsync<ElectiveModel, SemesterElectiveItem>()
            .Then(x => x.ManyJoin(a => a.Id, b => b.ElectiveId, (a, b) => a.SemesterElectives.AddRange(b)));
    }

    public Task<int> AddElective(ElectiveModel electiveModel)
    {
        var semesterElectives = electiveModel.SemesterElectives.Select(x => new { x.GradeLevel, x.Semester, x.ElectiveId });

        return CommandBuilder
            .InsertBuilder()
            .ForStoredProcedure("Orientation.CreateElective")
            .AddModel<ElectiveItem>(electiveModel)
            .Add(nameof(electiveModel.SemesterElectives), semesterElectives.CreateDataTable(), dbType: DbType.Object)
            .ExecuteCreateAsync();
    }

    public Task<bool> UpdateElectiveAndSemesterElectives(ElectiveModel electiveModel)
    {
        var semesterElectives = electiveModel.SemesterElectives.Select(x => new { x.GradeLevel, x.Semester, x.ElectiveId });

        return CommandBuilder
            .UpdateBuilder()
            .ForStoredProcedure("Orientation.UpdateElective")
            .AddModel<ElectiveItem>(electiveModel)
            .Add(nameof(electiveModel.SemesterElectives), semesterElectives.CreateDataTable(), dbType: DbType.Object)
            .ExecuteCommonAsync();
    }

    public Task<bool> DeleteElective(int id)
    {
        return CommandBuilder
            .UpdateBuilder()
            .ForStoredProcedure("Orientation.DeleteElective")
            .AddModel(new { id })
            .ExecuteCommonAsync();
    }

    public Task<bool> DeleteAsync(int id)
    {
        return base.DeleteAsync(id);
    }
}
