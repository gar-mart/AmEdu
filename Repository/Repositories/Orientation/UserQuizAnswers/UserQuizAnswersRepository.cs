using System.Linq;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Orientation;

public class UserQuizAnswersRepository: BaseAppRepository<UserQuizAnswersItem>
{
    public UserQuizAnswersRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<UserQuizAnswersRepository> logger
        ) : base(appConfigurations, logger) { }

    public async Task<UserQuizAnswersItem> ReturnUserQuizAnswers(int userId, int stepId)
    {
        var result = await CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Orientation.ReturnUserQuizAnswers")
            .AddModel(new { userId, stepId })
            .QueryMultipleAsync<QuestionItem, AnswerItem>();

        return new UserQuizAnswersItem
        {
            Questions = result.Item1.ToList(),
            Answers = result.Item2.ToList()
        };
    }
}
