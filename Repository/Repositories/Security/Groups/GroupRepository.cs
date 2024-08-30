using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Extensions;
using FD.Base.Shared.Models;
using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Security.Groups;

public sealed class GroupRepository: BaseAppRepository<GroupItem, GroupModel>
{
    public GroupRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<GroupRepository> logger
        ) : base(appConfigurations, logger)
    {
    }

    public new Task<IEnumerable<GroupModel>> GetListAsync(IUnitOfWork unitOfWork = null)
    {
        return base.GetListAsync(unitOfWork);
    }

    public Task<IEnumerable<GroupModel>> GetListByUserAsync(int id, IUnitOfWork unitOfWork = null)
    {
        return CommandBuilder
           .GetListBuilder()
           .ForStoredProcedure("ReturnGroupsForUser")
           .AddModel(new { id })
           .QueryListAsync<GroupModel>(unitOfWork);
    }

    public Task<GroupModel> GetByIdAsync(Guid? id, IUnitOfWork unitOfWork = null)
    {
        return CommandBuilder
            .GetByIdBuilder()
            .AddModel(new { id })
            .QueryMultipleAsync<GroupModel, RoleModel>(unitOfWork)
            .Then(result => (result.Item1.FirstOrDefault() ?? new GroupModel()).With(result.Item2));
    }


    public Task<bool> CreateDefaultAsync(IUnitOfWork unitOfWork = null)
    {
        return CommandBuilder
           .GetListBuilder()
           .ForStoredProcedure("CreateAspNetGroupsDefault")
           .ExecuteCommonAsync(unitOfWork);
    }

    public new Task<Guid> CreateAsync(IUserContext userContext, GroupItem item, IUnitOfWork unitOfWork = null)
    {
        return CommandBuilder
            .InsertBuilder(userContext)
            .AddModel(item)
            .AddOutput("newId", DbType.Guid)
            .CoreExecuteAsync(unitOfWork)
            .Then(s => s.Get<Guid>("newId"));
    }

    public Task<bool> CreateRoleAsync(string role, IUnitOfWork unitOfWork = null)
    {
        RoleModel item = new() { Name = role };
        return CommandBuilder
            .InsertBuilder()
            .ForStoredProcedure("CreateAspNetRole")
            .AddModel(new { item.Name, item.Area })
            .ExecuteCommonAsync(unitOfWork);
    }

    public new Task<bool> UpdateAsync(IUserContext userContext, GroupItem item, IUnitOfWork unitOfWork = null)
    {
        return base.UpdateAsync(userContext, item, unitOfWork);
    }

    public Task<bool> DeleteAsync(Guid id, IUnitOfWork unitOfWork = null)
    {
        return DeleteAsync(new GroupItem { Id = id }, unitOfWork);
    }

    public Task<bool> SetGroupRolesAsync(Guid groupId, IEnumerable<Guid> roleIds, IUnitOfWork unitOfWork = null)
    {
        return CommandBuilder
            .UpdateListBuilder()
            .ForStoredProcedure("CreateGroupRoles")
            .AddModel(new { groupId })
            .Add(nameof(roleIds), roleIds.CreateDataTable())
            .ExecuteCommonAsync(unitOfWork);
    }

    public Task<bool> SetUserGroupsAsync(int userId, IEnumerable<Guid> groupIds, IUnitOfWork unitOfWork = null)
    {
        return CommandBuilder
            .UpdateListBuilder()
            .ForStoredProcedure("CreateUserGroups")
            .AddModel(new { userId })
            .Add(nameof(groupIds), groupIds.CreateDataTable())
            .ExecuteCommonAsync(unitOfWork);
    }

    public Task<bool> SetGroupUsersAsync(Guid groupId, IEnumerable<int> userIds, IUnitOfWork unitOfWork = null)
    {
        return CommandBuilder
            .UpdateListBuilder()
            .ForStoredProcedure("CreateGroupUsers")
            .AddModel(new { groupId })
            .Add(nameof(userIds), userIds.CreateDataTable())
            .ExecuteCommonAsync(unitOfWork);
    }

    public async Task<IEnumerable<string>> GetEffectiveRolesForUserAsync(int id, bool includeRevoked = false, IUnitOfWork unitOfWork = null)
    {
        return await CommandBuilder
            .GetListBuilder()
            .ForStoredProcedure("ReturnEffectiveRolesForUser")
            .AddModel(new { id, includeRevoked })
            .QueryListAsync<string>(unitOfWork);
    }

    public async Task<IEnumerable<RoleModel>> GetRolesForUserAsync(int id, IUnitOfWork unitOfWork = null)
    {
        return await CommandBuilder
            .GetListBuilder()
            .ForStoredProcedure("ReturnRolesForUser")
            .AddModel(new { id })
            .QueryListAsync<RoleModel>(unitOfWork);
    }

    public Task<bool> GroupExistsAsync(string name = null, Guid? excludeId = null, IUnitOfWork unitOfWork = null)
    {
        return CommandBuilder
            .GetBySearchBuilder()
            .ForStoredProcedure("ReturnAspNetGroupExistsBySearch")
            .AddModel(new { name, excludeId })
            .QuerySingleAsync<bool>(unitOfWork);
    }
}
