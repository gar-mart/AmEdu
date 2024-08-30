using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Student.AppTileGradeLevel;

[TableMetaData("Student", "AppTileGradeLevel", "AppTileGradeLevel")]
public class AppTileGradeLevelItem: IBaseModel
{
    public int AppTileMetadataId { get; set; }
    public string GradeLevel { get; set; }
}
