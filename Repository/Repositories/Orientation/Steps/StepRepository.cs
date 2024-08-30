using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

using Dapper;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

using Shared.Extensions;
using Shared.Extensions.Tasks;

namespace Repository.Repositories.Orientation;

public class StepRepository: BaseAppRepository<StepItem, StepModel>
{
    public StepRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<StepRepository> logger) : base(appConfigurations, logger)
    {
    }

    public Task<bool> DeleteAsync(int id)
    {
        return base.DeleteAsync(id);
    }

    public Task<IEnumerable<StepModel>> GetListAsync()
    {
        return CommandBuilder
            .GetListBuilder()
            .QueryMultipleAsync<StepModel, StepGradeLevel>()
            .Then(result => result.ManyJoin(s => s.Id, g => g.StepId, (s, g) =>
                s.GradeLevels.AddRange(g.Select(g => g.GradeLevel))));
    }

    public Task<StepModel> CreateAsync(StepModel item)
    {
        return CommandBuilder
            .InsertBuilder()
            .AddModel(item, i => i.OrderBy)
            .QuerySingleAsync<StepModel>();
    }

    public Task<bool> UpdateAsync(StepModel item)
    {
        var grades = item.GradeLevels.Select(x => new { x }).CreateDataTable();
        var youTubeVideoContent = item.Content.YouTubeVideoContent.Select(x => new { x.Id, x.VideoId, x.OrderBy }).CreateDataTable();
        var systemContent = item.Content.SystemContent.Select(x => new { x.Id, x.ComponentId, x.OrderBy }).CreateDataTable();
        var appTileMetadataContent = item.Content.ShortcutContent.Select(x => new { x.Id, x.AppTileMetadataId, x.OrderBy }).CreateDataTable();
        var studentResourceContent = item.Content.StudentResourceContent.Select(x => new { x.Id, x.StudentResourceId, x.OrderBy }).CreateDataTable();
        var contactContent = item.Content.ContactContent.Select(x => new { x.Id, x.UserId, x.OrderBy }).CreateDataTable();
        var textImageContent = item.Content.TextImageContent.Select(x => new { x.Id, x.Content, x.OrderBy }).CreateDataTable();
        var signatureContent = item.Content.SignatureContent.Select(x => new { x.Id, x.OrderBy, x.Signer, x.Disclaimer }).CreateDataTable();

        // the TVP.QuizContent is a little special in that it saves the QuizContent, Questions, and Answers in one TVP
        var quizContent = item.Content.QuizContent
            // Quiz Content Type
            .Select(c => new { QuizContentId = c.Id, QuestionId = (int?)null, AnswerId = (int?)null, Text = (string)null, c.OrderBy, IsCorrectAnswer = (bool?)null })
            // Questions
            .Concat(item.Content.QuizContent.SelectMany(c => c.Questions.Select((q, i) => new { QuizContentId = c.Id, QuestionId = (int?)q.Id, AnswerId = (int?)null, Text = q.QuestionText, OrderBy = i, IsCorrectAnswer = (bool?)null }))
            // Answers
            .Concat(item.Content.QuizContent.SelectMany(c => c.Questions.SelectMany(q => q.Answers.Select((a, i) => new { QuizContentId = c.Id, QuestionId = (int?)q.Id, AnswerId = (int?)a.Id, Text = a.AnswerText, OrderBy = i, IsCorrectAnswer = (bool?)a.IsCorrectAnswer })))))
            .CreateDataTable();

        return CommandBuilder
            .UpdateBuilder()
            .AddModel(item,
                i => i.Id,
                i => i.Name,
                i => i.ActivateDate,
                i => i.ExpirationDate)
            .Add(nameof(grades), grades, DbType.Object)
            .Add(nameof(youTubeVideoContent), youTubeVideoContent, DbType.Object)
            .Add(nameof(systemContent), systemContent, DbType.Object)
            .Add(nameof(appTileMetadataContent), appTileMetadataContent, DbType.Object)
            .Add(nameof(studentResourceContent), studentResourceContent, DbType.Object)
            .Add(nameof(contactContent), contactContent, DbType.Object)
            .Add(nameof(textImageContent), textImageContent, DbType.Object)
            .Add(nameof(signatureContent), signatureContent, DbType.Object)
            .Add(nameof(quizContent), quizContent, DbType.Object)
            .ExecuteCommonAsync();
    }

    public Task<StepModel> DuplicateAsync(int id)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("DuplicateStep")
            .AddModel(new { id })
            .QueryMultipleAsync<StepModel, StepGradeLevel>()
            .Then(result => result
                .ManyJoin(s => s.Id, g => g.StepId, (s, g) => s.GradeLevels = g
                    .Select(gl => gl.GradeLevel)
                    .AsList())
                .FirstOrDefault());
    }

    public Task<bool> UpdateOrderAsync(IEnumerable<StepItem> steps)
    {
        return CommandBuilder
           .UpdateBuilder()
           .ForStoredProcedure("UpdateStepOrder")
           .AddModel(new { steps = steps.CreateDataTable() })
           .ExecuteCommonAsync();
    }
}
