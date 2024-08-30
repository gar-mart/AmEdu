using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Orientation;

public class QuestionAnswerRepository: BaseAppRepository<QuestionAnswerItem>
{
    public QuestionAnswerRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<QuestionAnswerRepository> logger) : base(appConfigurations, logger) { }

    public Task<bool> SubmitUserAnswers(int userId, List<QuestionAnswerItem> questionsAndAnswers)
    {
        var answerList = questionsAndAnswers.Select(q => new { q.QuestionId, q.AnswerId }).CreateDataTable();
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Orientation.SubmitUserAnswers")
            .AddModel(new { userId, answerList })
            .ExecuteCommonAsync();
    }
}
