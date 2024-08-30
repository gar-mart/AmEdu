using FD.Base.Shared.Repository.Infrastructure.Database;

using Repository.Repositories.Common;

namespace Repository.Repositories.Orientation;

[TableMetaData(nameof(Orientation), "CommunityPassportForms", "CommunityPassportForm")]
public class CommunityPassportFormItem
{
    public Cell Cell { get; set; }
    public string Url { get; set; }
}
