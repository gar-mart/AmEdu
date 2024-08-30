using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Student.AppTileGradeLevel;

using Shared.Extensions;
using Shared.Extensions.Tasks;

namespace Repository.Repositories.Student.AppTileMetadata;

public class AppTileMetadataRepository: BaseAppRepository<AppTileMetadataItem>
{
    public AppTileMetadataRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<AppTileMetadataRepository> logger) : base(appConfigurations, logger) { }

    public async Task<IEnumerable<AppTileMetadataModel>> GetMetadataListAsync()
    {
        return await CommandBuilder
            .GetListBuilder()
            .ForStoredProcedure("Student.ReturnAppTileMetadata")
            .QueryMultipleAsync<AppTileMetadataModel, AppTileGradeLevelItem>()
            .Then(r => r.Item1
            .ManyJoin(r.Item2, a => a.Id, c => c.AppTileMetadataId, (a, c) => a.AppTileGradeLevels.AddRange(c)));
    }

    public Task<bool> UpdateAppTileMetadata(int id, string image)
    {
        return CommandBuilder
            .UpdateBuilder()
            .AddModel(new { id, image })
            .ExecuteCommonAsync();
    }

    public async Task<bool> UpdateAppTileMetadata(AppTileMetadataModel appTileItem)
    {
        var gradeLevels = appTileItem.AppTileGradeLevels.Select(x => x.GradeLevel).ToList();

        return await CommandBuilder
            .UpdateBuilder()
            .AddModel<AppTileMetadataItem>(appTileItem)
            .Add(nameof(gradeLevels), gradeLevels.Select(x => new { x }).CreateDataTable(), dbType: DbType.Object)
            .ExecuteCommonAsync();
    }

    public async Task<IEnumerable<string>> GetAppTileGradeLevelsByMetadataIdAsync(int metadataId)
    {
        return await CommandBuilder
            .GetListBuilder()
            .ForStoredProcedure("Student.ReturnAppTileGradeLevelsByMetadataId")
            .AddModel(new { metadataId })
            .QueryListAsync<string>();
    }

    public async Task<bool> DeleteAppTileGradeLevelsByMetadataId(int metadataId)
    {
        return await CommandBuilder
            .UpdateBuilder()
            .ForStoredProcedure("Student.DeleteAppTileGradeLevelsByMetadataId")
            .AddModel(new { metadataId })
            .ExecuteCommonAsync();
    }

    public async Task<bool> AddAppTileGradeLevel(int metadataId, string gradeLevel)
    {
        return await CommandBuilder
            .InsertBuilder()
            .ForStoredProcedure("Student.AddAppTileGradeLevel")
            .AddModel(new { metadataId, gradeLevel })
            .ExecuteCommonAsync();
    }

    public async Task<int> AddAppTileMetadata(AppTileMetadataModel appTileMetadataModel)
    {
        var gradeLevels = appTileMetadataModel.AppTileGradeLevels.Select(x => x.GradeLevel).ToList();

        return await CommandBuilder
            .InsertBuilder()
            .AddModel<AppTileMetadataItem>(appTileMetadataModel)
            .Add(nameof(gradeLevels), gradeLevels.Select(x => new { x }).CreateDataTable(), dbType: DbType.Object)
            .ExecuteCreateAsync();
    }

    public async Task<bool> DeleteAppTileMetadata(int id)
    {
        return await CommandBuilder
            .UpdateBuilder()
            .ForStoredProcedure("Student.DeleteAppTileMetadata")
            .AddModel(new { id })
            .ExecuteCommonAsync();
    }

    public async Task<IEnumerable<AppTileMetadataItem>> ReturnAppTilesBySearch(string searchTerm)
    {
        return await CommandBuilder
            .GetBySearchBuilder()
            .Add(nameof(searchTerm), searchTerm)
            .QueryListAsync<AppTileMetadataItem>();
    }

    public async Task<AppTileMetadataItem> ReturnAppTileMetadataItemById(int id)
    {
        return await CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Student.ReturnAppTileMetadataById")
            .AddModel(new { id })
            .QuerySingleAsync<AppTileMetadataItem>();
    }
}
