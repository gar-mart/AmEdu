using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Orientation.ConnectionSurveyStep;

using Shared.Extensions.Tasks;

namespace Repository.Repositories.Orientation;

public class ConnectionSurveyStepRepository: BaseAppRepository<ConnectionSurveyStepItem>
{
    public ConnectionSurveyStepRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<ConnectionSurveyStepRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<bool> Step_ConnectionSurvey_Submit(ConnectionSurveyStepItem surveyData)
    {
        return CommandBuilder
            .UpdateBuilder()
            .ForStoredProcedure("Orientation.Step_ConnectionSurvey_Submit")
            .AddModel(surveyData)
            .ExecuteCommonAsync();
    }

    public Task<ConnectionSurveyStepItem> ReturnStepConnectionSurvey(int userId)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Orientation.ReturnStepConnectionSurvey")
            .AddModel(new { userId })
            .QuerySingleAsync<ConnectionSurveyStepItem>()
            .Then(x => x ?? new ConnectionSurveyStepItem());
    }
}
