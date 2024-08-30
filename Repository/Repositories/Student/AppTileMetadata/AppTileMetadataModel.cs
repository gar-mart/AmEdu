using System.Collections.Generic;

using Repository.Repositories.Student.AppTileGradeLevel;

namespace Repository.Repositories.Student.AppTileMetadata;

public class AppTileMetadataModel: AppTileMetadataItem
{
    public List<AppTileGradeLevelItem> AppTileGradeLevels { get; set; } = new List<AppTileGradeLevelItem>();
}
