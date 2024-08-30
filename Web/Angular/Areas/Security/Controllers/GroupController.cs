using System;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

using Repository.Infrastructure;
using Repository.Repositories.Security.Groups;
using Repository.Repositories.Security.Users;

using Web.Areas.Account.Hubs;

namespace Web.Areas.Security.Controllers;

[Area("Security")]
[Authorize(Roles = UserRoles.Admin_SecurityGroups_View + "," + UserRoles.Admin_Users_View)]
public sealed class GroupController: ApiController
{
    private readonly GroupRepository _groupRepository;
    private readonly UserRepository _userRepository;
    private readonly IHubContext<AccountHub, IAccountHub> _accountHubContext;

    public GroupController(
        GroupRepository groupRepository,
        UserRepository userRepository,
        IHubContext<AccountHub, IAccountHub> accountHubContext)
    {
        _groupRepository = groupRepository;
        _userRepository = userRepository;
        _accountHubContext = accountHubContext;
    }

    #region REST
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var group = await _groupRepository.GetListAsync();
        return Ok(group);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var (members, group) = await (_userRepository.GetListAsync(securityGroup: id), _groupRepository.GetByIdAsync(id));
        group.UserList = members.Select(u => u.UserId);
        return Ok(group);
    }

    [HttpPost]
    [Authorize(Roles = UserRoles.Admin_SecurityGroups_Edit)]
    public async Task<IActionResult> Post([FromBody] GroupModel value)
    {
        value.Id = await _groupRepository.CreateAsync(UserContext, value);

        if (value.Id != Guid.Empty)
        {
            _ = await (
                _groupRepository.SetGroupUsersAsync(value.Id, value.UserList),
                _groupRepository.SetGroupRolesAsync(value.Id, value.RoleList)
            );

            await AccountHub.RefreshUsersAsync(_accountHubContext);
        }

        return Ok(value.Id);
    }

    [HttpPut]
    [Authorize(Roles = UserRoles.Admin_SecurityGroups_Edit)]
    public async Task<IActionResult> Put([FromBody] GroupModel value)
    {
        var result = await _groupRepository.UpdateAsync(UserContext, value);
        await (
            value.IsDefault ? Task.CompletedTask : _groupRepository.SetGroupUsersAsync(value.Id, value.UserList),
            _groupRepository.SetGroupRolesAsync(value.Id, value.RoleList)
        );

        await AccountHub.RefreshUsersAsync(_accountHubContext);

        return Ok(result);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = UserRoles.Admin_SecurityGroups_Edit)]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _groupRepository.DeleteAsync(id);

        await AccountHub.RefreshUsersAsync(_accountHubContext);

        return Ok(result);
    }
    #endregion
}
