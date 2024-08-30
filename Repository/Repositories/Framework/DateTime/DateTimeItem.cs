using System;

using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Framework.DateTime;

[TableMetaData(nameof(Framework), "DateTime", "DateTime")]
public class DateTimeItem
{
    public DateOnly? Date { get; set; }
    public TimeOnly? Time { get; set; }
    public System.DateTime? DateTime { get; set; }
}
