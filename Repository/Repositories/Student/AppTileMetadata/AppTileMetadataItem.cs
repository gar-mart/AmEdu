using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Student.AppTileMetadata;

[TableMetaData("Student", "AppTileMetadata", "AppTileMetadata")]
public class AppTileMetadataItem: IBaseModel
{
    public string Title { get; set; }

    [FdIgnore]
    public string Image { get; set; }
    public string Url { get; set; }

    [FdIgnore]
    public int DefaultOrderBy { get; set; }
    public bool AlwaysShow { get; set; }
    public bool IsDefault { get; set; }
}
