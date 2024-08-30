using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Staff.QuoteOfTheDay;

[TableMetaData("Staff", "QuotesOfTheDay", "QuoteOfTheDay")]
public class QuoteOfTheDayItem: IBaseModel
{
    public string Quote { get; set; }
    public string Author { get; set; }
    [FdIgnore(onUpdate: false)]
    public int OrderBy { get; set; }
}
