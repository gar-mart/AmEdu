using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Orientation;

public class SendUsASelfieStepRepository: BaseAppRepository<SendUsASelfieStepItem>
{
    public SendUsASelfieStepRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<SendUsASelfieStepRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<bool> Step_SendUsASelfie_Submit(SendUsASelfieStepItem data)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Orientation.Step_SendUsASelfie_Submit")
            .AddModel(data)
            .ExecuteCommonAsync();
    }

    public async Task<SendUsASelfieStepItem> ReturnStepSendUsASelfie(int userId)
    {
        return (await CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Orientation.ReturnStepSendUsASelfie")
            .AddModel(new { userId })
            .QuerySingleAsync<SendUsASelfieStepItem>()) ?? new SendUsASelfieStepItem();
    }
}
