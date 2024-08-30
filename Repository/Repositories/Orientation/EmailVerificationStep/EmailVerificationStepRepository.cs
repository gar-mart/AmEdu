using System.Data;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

using Shared.Extensions.Tasks;

namespace Repository.Repositories.Orientation;

public class EmailVerificationStepRepository: BaseAppRepository<EmailVerificationStepItem>
{
    public EmailVerificationStepRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<EmailVerificationStepRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<bool> Step_EmailVerification_VerifyCode(int userId, EmailVerificationStepItem data)
    {
        const string codeIsCorrect = nameof(codeIsCorrect);
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Orientation.Step_EmailVerification_VerifyCode")
            .AddModel(data)
            .AddModel(new { userId })
            .AddOutput(codeIsCorrect, DbType.Boolean)
            .CoreExecuteAsync()
            .Then(x => x.Get<bool>(codeIsCorrect));
    }

    public Task<string> Step_EmailVerification_ReturnCode(int userId)
    {
        const string verificationCode = nameof(verificationCode);
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Orientation.Step_EmailVerification_ReturnCode")
            .AddModel(new { userId })
            .Add(nameof(verificationCode), null, DbType.String, ParameterDirection.Output, int.MaxValue)
            .CoreExecuteAsync()
            .Then(x => x.Get<string>(verificationCode));
    }
}
