using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Security.Users;

namespace Repository.Repositories.Attendance.Points;

public class PointsRepository: BaseAppRepository<PointsItem, PointsModel>
{
    public PointsRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<PointsRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<IEnumerable<PointsModel>> GetListAsync(int userId, DateTime startDate, DateTime endDate)
    {
        return GetListAsync(new { userId, startDate, endDate });
    }

    public Task<bool> CreateAsync(ApplicationIdentityUser userContext, PointsItem item)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure(CommandBuilder.GetEntityTypeInfo().Create)
            .IsInsertBuilder()
            .AddModel(item)
            .AddModel(new { userContext.CurrentDateTime })
            .ExecuteCommonAsync();
    }

    public Task<bool> CreateListAsync(ApplicationIdentityUser userContext, List<PointsItem> points)
    {
        var pointsType = points.Select((a) => new
        {
            a.Id,
            a.UserId,
            a.StaffId,
            Type = (int)a.Type,
            a.Value,
            a.Date,
            Comments = "",
            PageSource = a.PageSource != null ? (int?)a.PageSource : null,
            UserSource = a.UserSource == null ? (int?)a.UserSource : null
        }).ToList();
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.CreatePointsList")
            .IsInsertBuilder()
            .Add(nameof(points), pointsType.CreateDataTable(), dbType: DbType.Object)
            .AddModel(new { userContext.CurrentDateTime })
            .ExecuteCommonAsync();
    }

    public Task<IEnumerable<PointsModel>> ReturnDetailsAsync(int studentId, PointsType pointsType)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.ReturnPointDetails")
            .AddModel(new { studentId, pointsType })
            .QueryListAsync<PointsModel>();
    }

    public Task<IEnumerable<CashOutPointsItem>> ReturnPointBalances(List<string> gradeLevels)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.ReturnPointBalances")
            .Add(nameof(gradeLevels), gradeLevels.Select(x => new { x }).CreateDataTable(), dbType: DbType.Object)
            .QueryListAsync<CashOutPointsItem>();
    }

    public Task<bool> DeleteAsync(int id)
    {
        return base.DeleteAsync(id);
    }
}
