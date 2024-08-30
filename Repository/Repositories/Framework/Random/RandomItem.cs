using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Framework.Random;

[TableMetaData(nameof(Framework), "Randoms", "Random")]
public class RandomItem
{
    public int Value { get; set; }
}
