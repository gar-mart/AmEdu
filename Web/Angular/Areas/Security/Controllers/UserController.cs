using System;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Web.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

using Repository.Infrastructure;
using Repository.Repositories.Security.Groups;
using Repository.Repositories.Security.Users;

using Web.Areas.Account.Hubs;
using Web.Areas.Security.Models;

namespace Web.Areas.Security.Controllers;

[Area("Security")]
[Authorize(Roles = UserRoles.Admin_SecurityGroups_View + "," + UserRoles.Admin_Users_View)]
public sealed class UserController: ApiController
{
    private readonly UserRepository _userRepository;
    private readonly GroupRepository _groupRepository;
    private readonly UserManager<ApplicationIdentityUser> _userManager;
    private readonly IViewRenderService _viewRenderService;
    private readonly IHubContext<AccountHub, IAccountHub> _accountHubContext;

    public UserController(UserRepository userRepository,
        GroupRepository groupRepository,
        UserManager<ApplicationIdentityUser> userManager,
        IViewRenderService viewRenderService,
        IHubContext<AccountHub, IAccountHub> accountHubContext)
    {
        _userRepository = userRepository;
        _groupRepository = groupRepository;
        _userManager = userManager;
        _viewRenderService = viewRenderService;
        _accountHubContext = accountHubContext;
    }

    #region REST
    [HttpGet]
    public async Task<IActionResult> Get(bool includeInactive)
    {
        var users = await _userRepository.GetListAsync(includeInactive: includeInactive);
        return Ok<IUserDto>(users);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var (groups, user) = await (_groupRepository.GetListByUserAsync(id), _userRepository.GetByIdAsync(id));
        user.SecurityGroupList = groups?.Select(g => g.Id);
        return Ok<IUserDto>(user);
    }

    [HttpPost]
    [Authorize(Roles = UserRoles.Admin_Users_Edit)]
    public async Task<IActionResult> Post([FromBody] ApplicationIdentityUser value)
    {
        var result = await _userRepository.CreateAsync(UserContext, value);

        int userId;
        if (result.Succeeded)
        {
            var user = await _userRepository.GetSingleAsync(value.UserName);
            userId = user.UserId;
            _ = await _groupRepository.SetUserGroupsAsync(user.UserId, value.SecurityGroupList);

            if (value.SendInvitation)
            {
                _ = await SendInvitation(userId);
            }
        }
        else
        {
            return BadRequest(result.Errors.First().Description);
        }

        return Ok(userId);
    }

    [HttpPut]
    [Authorize(Roles = UserRoles.Admin_Users_Edit)]
    public async Task<IActionResult> Put([FromBody] ApplicationIdentityUser value)
    {
        var result = await _userRepository.UpdateAsync(UserContext, value);

        if (result.Succeeded)
        {
            _ = await _groupRepository.SetUserGroupsAsync(value.UserId, value.SecurityGroupList);
            await AccountHub.RefreshUsersAsync(_accountHubContext, value.UserId);

            if (value.SendInvitation)
            {
                _ = await SendInvitation(value.UserId);
            }
        }
        else
        {
            return BadRequest(result.Errors.First().Description);
        }

        return Ok(result.Succeeded);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = UserRoles.Admin_Users_Edit)]
    public async Task<IActionResult> Put(int id, [FromBody] ApplicationIdentityUser value)
    {
        value.UserId = id;
        var result = await _userRepository.UpdateAsync(UserContext, value);
        if (result.Succeeded)
        {
            await AccountHub.RefreshUsersAsync(_accountHubContext, value.UserId);

            if (value.SendInvitation)
            {
                _ = await SendInvitation(id);
            }
        }
        else
        {
            return BadRequest(result.Errors.First().Description);
        }

        return Ok(result);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = UserRoles.Admin_Users_Edit)]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _userRepository.DeleteAsync(UserContext, id, true);

        await AccountHub.RefreshUsersAsync(_accountHubContext, id);

        return Ok(result);
    }
    #endregion

    [HttpGet("[action]")]
    public async Task<IActionResult> GetRolesForUser(int userId, Guid[] groupIds)
    {
        using var unitOfWork = _groupRepository.CreateUnitOfWork();
        if (groupIds.Any())
        {
            _ = await _groupRepository.SetUserGroupsAsync(userId, groupIds, unitOfWork);
        }
        var roles = await _groupRepository.GetRolesForUserAsync(userId, unitOfWork);

        return Ok(roles);
    }

    private async Task<bool> SendInvitation(int userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        var forgotPasswordCode = await _userManager.GeneratePasswordResetTokenAsync(user);
        var viewModel = new InvitationEmailViewModel(user, forgotPasswordCode);
        var html = await _viewRenderService.RenderToStringAsync("InvitationEmail", viewModel);

        throw new NotImplementedException(nameof(SendInvitation));
        // undone: not implemented
        // await _emailSenderService.SendEmailAsync(user.Email, "FD Base Invitation", html);

        return true;
    }
}
