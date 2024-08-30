using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Attendance.Classes;
using Repository.Repositories.Attendance.ClassUsers;

using Shared.Buzz;
using Shared.Buzz.Schemas;
using Shared.Extensions.Tasks;

namespace Repository.Repositories.Attendance;

public class ClassWorkRepository: BaseAppRepository<ClassWorkItem, ClassWorkModel>
{
    public ClassWorkRepository(IOptions<AppConfigurations> appConfigurations, ILogger<ClassWorkRepository> logger) : base(appConfigurations, logger) { }

    public Task<bool> CreateAsync(int courseId, IEnumerable<Item> items, IEnumerable<Work> work, ApiType apiType)
    {
        var builder = CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure(CommandBuilder.GetEntityTypeInfo().Create)
            .WithCommandTimeout((int)TimeSpan.FromMinutes(5).TotalSeconds)
            .AddModel(new
            {
                classConnexusId = apiType == ApiType.Connexus ? courseId : (int?)null,
                classLincolnLearningId = apiType == ApiType.LincolnLearning ? courseId : (int?)null,
                classFlexPointId = apiType == ApiType.FlexPoint ? courseId : (int?)null,
            });

        if (items != null)
        {
            var classWork = items.Select(item => new
            {
                ItemId = item.Id,
                item.Data.Title,
                item.Data.Type,
                item.Data.DueDate,
                item.Data.DueDateGrace,
                item.Data.Gradable
            }).Where(item => item.DueDate != null && item.Title != null);

            builder = builder.Add(nameof(classWork), classWork.CreateDataTable(), System.Data.DbType.Object);
        }

        if (work.Any())
        {
            var classUserWork = work.Select(work => new
            {
                UserConnexusId = apiType == ApiType.Connexus ? work.UserId : null,
                ConnexusEnrollmentId = apiType == ApiType.Connexus ? work.EnrollmentId : "0",

                UserLincolnLearningId = apiType == ApiType.LincolnLearning ? work.UserId : null,
                LincolnLearningEnrollmentId = apiType == ApiType.LincolnLearning ? work.EnrollmentId : "0",

                UserFlexPointId = apiType == ApiType.FlexPoint ? work.UserId : null,
                FlexPointEnrollmentId = apiType == ApiType.FlexPoint ? work.EnrollmentId : "0",

                work.ItemId,
                WorkId = int.Parse(work.WorkId),
                work.SubmittedDate,
                ScoredDate = work.ScoredDate.Year < 2000 ? (DateTime?)null : work.ScoredDate,
                work.PointsPossible,
                work.PointsAchieved
            });
            builder = builder.Add(nameof(classUserWork), classUserWork.CreateDataTable(), System.Data.DbType.Object);
        }

        return builder.ExecuteCommonAsync();
    }

    public Task<IEnumerable<ClassModel>> GetEnrollmentsToSyncClassWork(ApiType apiType)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("ReturnEnrollmentsToSyncClassWork")
            .AddModel(new { apiType })
            .QueryMultipleAsync<ClassModel, ClassUserModel>()
            .Then(result => result.ManyJoin(
                c => c.Id,
                u => u.ClassId,
                (c, u) => c.ClassUsers.AddRange(u)));
    }
}
