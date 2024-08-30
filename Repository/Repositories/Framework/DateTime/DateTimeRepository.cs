using System.Threading.Tasks;

using FD.Base.Shared.Models;
using FD.Base.Shared.Repository.Infrastructure.Database;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Framework.DateTime;

public sealed class DateTimeRepository: BaseAppRepository<DateTimeItem, DateTimeModel>
{
    public DateTimeRepository(IOptions<AppConfigurations> appConfigurations, ILogger<DateTimeRepository> logger) : base(appConfigurations, logger)
    {
        ErrorMessageMap.Add(1, "Simulated Application Database Error");
    }

    public Task<DateTimeModel> GetSingleAsync(IUserContext userContext, bool causeError = false, bool causeUniqueException = false, bool causeOverflowException = false, IUnitOfWork unitOfWork = null)
    {
        return GetSingleAsync(userContext, new { causeError, causeUniqueException, causeOverflowException }, unitOfWork);
    }

    public new Task<bool> UpdateAsync(DateTimeItem item, IUnitOfWork unitOfWork = null)
    {
        return base.UpdateAsync(item, unitOfWork);
    }
}
