using System.Collections.Generic;
using System.Threading.Tasks;

using FD.Base.Shared.Models;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Student;

namespace Repository.Repositories.Staff;

public class ReFuelRepository: BaseAppRepository<ReFuelItem>
{
    public ReFuelRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<ReFuelRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<IEnumerable<ReFuelReservationPromotionModel>> UpdateWithPromotionsAsync(IUserContext userContext, ReFuelItem item)
    {
        return CommandBuilder
            .UpdateBuilder(userContext)
            .AddModel(item)
            .QueryListAsync<ReFuelReservationPromotionModel>();
    }

    public Task<ReFuelItem> GetByIdAsync(int id = 1)
    {
        return base.GetByIdAsync(id);
    }
}
