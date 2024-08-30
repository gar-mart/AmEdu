using System;

using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Common.Breaks;

[TableMetaData("Common", "Breaks", "Break")]
public class BreakItem: IBaseModel
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Name { get; set; }
}
