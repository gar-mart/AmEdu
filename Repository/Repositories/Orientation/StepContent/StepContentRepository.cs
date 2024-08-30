using System.Collections.Generic;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

using Shared.Extensions.Tasks;

namespace Repository.Repositories.Orientation;

public class StepContentRepository: BaseAppRepository<StepContentModel>
{
    public StepContentRepository(IOptions<AppConfigurations> appConfigurations, ILogger<StepContentRepository> logger) : base(appConfigurations, logger)
    {
    }

    public Task<StepContentModel> GetListAsync(int stepId)
    {
        return CommandBuilder
            .GetListBuilder()
            .AddModel(new { stepId })
            .QueryMultipleAsync<YouTubeVideoContentItem, AppTileMetadataContentItem, StudentResourceContentItem, ContactContentItem, TextImageContentItem, SignatureContentItem, SystemContentItem, QuizContentItem>()
            .Then(result => new StepContentModel(result));
    }

    #region Signature Content
    public Task<StudentSignatureContentItem> GetStudentSignatureContentAsync(int studentId, int signatureContentId)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("ReturnStudentSignatureContent")
            .AddModel(new { studentId, signatureContentId })
            .QuerySingleAsync<StudentSignatureContentItem>();
    }

    public Task<bool> UpdateStudentSignatureContentAsync(StudentSignatureContentItem item)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("UpdateStudentSignatureContent")
            .AddModel(item)
            .ExecuteCommonAsync();
    }
    #endregion

    #region Quiz Content
    public Task<IEnumerable<QuestionModel>> GetQuizContentByIdAsync(int id, int? userId = null)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("ReturnQuizContentById")
            .AddModel(new { id, userId })
            .QueryMultipleAsync<QuestionModel, AnswerItem>()
            .Then(result => result.ManyJoin(
                q => q.Id,
                a => a.QuestionId,
                (q, a) => q.Answers.AddRange(a)));
    }
    #endregion
}
