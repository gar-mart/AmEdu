using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

using Shared.Extensions;
using Shared.Extensions.Tasks;

namespace Repository.Repositories.Attendance;

public class InterventionEmailTemplateRepository: BaseAppRepository<InterventionEmailTemplateItem, InterventionEmailTemplateModel>
{
    public InterventionEmailTemplateRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<InterventionEmailTemplateRepository> logger) : base(appConfigurations, logger)
    {
    }

    public Task<IEnumerable<InterventionEmailTemplateModel>> GetListAsync()
    {
        return CommandBuilder
            .GetListBuilder()
            .QueryMultipleAsync<InterventionEmailTemplateModel, InterventionEmailTemplateAttachment>()
            .Then(result => result.ManyJoin(
                t => t.InterventionLevel,
                a => a.InterventionLevel,
                (t, a) => t.AttachmentList.AddRange(a)));
    }

    public Task<InterventionEmailTemplateModel> GetByInterventionId(int id)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.ReturnInterventionEmailTemplateByInterventionId")
            .AddModel(new { id })
            .QueryMultipleAsync<InterventionEmailTemplateModel, InterventionEmailTemplateAttachment, InterventionEmailTemplateRecipient>()
            .Then(result =>
            {
                var template = result.Item1.FirstOrDefault();

                if (template != null)
                {
                    template.AttachmentList.AddRange(result.Item2);
                    template.Recipients.AddRange(result.Item3);
                }

                return template;
            });
    }

    public async Task<bool> UpdateAsync(InterventionEmailTemplateModel interventionEmailTemplateModel)
    {
        var builder = CommandBuilder
            .UpdateBuilder()
            .ForStoredProcedure("Attendance.UpdateInterventionEmailTemplate")
            .AddModel<InterventionEmailTemplateItem>(interventionEmailTemplateModel);

        if (interventionEmailTemplateModel.AttachmentList.Any())
        {
            _ = builder.Add(nameof(interventionEmailTemplateModel.AttachmentList), interventionEmailTemplateModel.AttachmentList.Select(x => new { x.Filename }).CreateDataTable(), System.Data.DbType.Object);
        }

        return await builder.ExecuteCommonAsync();
    }
}
