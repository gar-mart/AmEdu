using System.Collections.Generic;

using FD.Base.Shared.Repository.Infrastructure.Database;

using Repository.Repositories.Student.AppTileGradeLevel;
using Repository.Repositories.Student.AppTileMetadata;

namespace Repository.Repositories.Student.AppTiles;

public class AppTileModel: AppTileItem
{
    public AppTileMetadataItem Metadata { get; set; }

    public List<AppTileGradeLevelItem> AppTileGradeLevels { get; set; } = new List<AppTileGradeLevelItem>();

    [FdIgnore]
    public IEnumerable<string> GradeLevels { get; set; }
}
