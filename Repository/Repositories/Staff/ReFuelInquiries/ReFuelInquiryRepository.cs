using System;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Staff.ReFuelInquiries;
public sealed class ReFuelInquiryRepository: BaseAppRepository<ReFuelInquiryItem, ReFuelInquiryModel>
{
    public ReFuelInquiryRepository(IOptions<AppConfigurations> appConfigurations, ILogger<ReFuelInquiryRepository> logger) : base(appConfigurations, logger) { }

    public Task<ReFuelInquiryModel> GetByIdAsync(DateOnly date)
    {
        return GetByIdAsync(new ReFuelInquiryItem { Date = date });
    }

    public Task<bool> SyncAsync(ReFuelInquiryItem item)
    {
        return base.SyncAsync(item);
    }
}
