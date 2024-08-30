using System;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Common.Student;

namespace Repository.Repositories.Orientation;

public class StepsByStudentRepository: BaseAppRepository<StepsByStudentItem>
{
    public StepsByStudentRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<StepsByStudentRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<StepsByStudentItem> CompleteStepCrud(int userId, int stepId)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Orientation.CompleteStep")
            .AddModel(new { userId, stepId })
            .QuerySingleAsync<StepsByStudentItem>();
    }

    public async Task<StudentStepsAndProgressItem> ReturnStepsByStudent(int userId, DateTime date)
    {
        var studentStepsAndProgress = new StudentStepsAndProgressItem();
        var result = await CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Orientation.ReturnStepsByStudent")
            .AddModel(new { userId, date })
            .QueryMultipleAsync<StepsByStudentItem, StudentProgressItem>();

        studentStepsAndProgress.StudentSteps = result.Item1.ToList();
        studentStepsAndProgress.StudentProgress = result.Item2.FirstOrDefault();
        return studentStepsAndProgress;
    }
}
