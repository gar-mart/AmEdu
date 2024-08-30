using System.Collections.Generic;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Student.AppTileGradeLevel;
using Repository.Repositories.Student.AppTileMetadata;

using Shared.Extensions.Tasks;

namespace Repository.Repositories.Student.AppTiles;

public class AppTileRepository: BaseAppRepository<AppTileItem, AppTileModel>
{
    public AppTileRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<AppTileRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<IEnumerable<AppTileModel>> GetListAsync(int currentUserId)
    {
        return CommandBuilder
            .GetListBuilder()
            .AddModel(new { currentUserId })
            .QueryMultipleAsync<AppTileModel, AppTileMetadataItem, AppTileGradeLevelItem>()
            .Then(r => r.Item1
            .SingleJoin(r.Item2, a => a.MetadataId, b => b.Id, (a, b) => a.Metadata = b)
            .ManyJoin(r.Item3, a => a.MetadataId, c => c.AppTileMetadataId, (a, c) => a.AppTileGradeLevels.AddRange(c)));
    }

    public Task<bool> UpdateAsync(int currentUserId, AppTileItem item)
    {
        return CommandBuilder
            .UpdateBuilder()
            .AddModel(new { currentUserId })
            .AddModel(item)
            .ExecuteCommonAsync();
    }
}
