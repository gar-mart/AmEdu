using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Student.AppTiles;

[TableMetaData("Student", "AppTiles", "AppTile")]
public class AppTileItem: IBaseModel
{
    [FdIgnore]
    public int UserId { get; set; }
    [FdIgnore]
    public int MetadataId { get; set; }
    public bool Show { get; set; }
    public int OrderBy { get; set; }
}
