using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Models;
using FD.Base.Shared.Repository.Infrastructure.Database;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Security.Users;

public sealed class UserRepository: BaseAppRepository<ApplicationIdentityUser>
{
    private readonly IServiceProvider _services;

    public UserRepository(
        IOptions<AppConfigurations> appConfigurations,
        IServiceProvider services,
        ILogger<UserRepository> logger
        )
        : base(appConfigurations, logger)
    {
        _services = services;
    }

    public async Task<IEnumerable<ApplicationIdentityUser>> GetListAsync(Guid securityGroup, bool includeInactive = false, IUnitOfWork unitOfWork = null)
    {
        var includeUserIds = await CommandBuilder
            .GetListBuilder()
            .ForStoredProcedure("ReturnUsersForGroup")
            .AddModel(new { Id = securityGroup })
            .QueryListAsync<int>(unitOfWork);

        return await GetListAsync(includeInactive, includeUserIds, unitOfWork);

    }
    public async Task<List<ApplicationIdentityUser>> GetListAsync(bool includeInactive = false, IEnumerable<int> includeUserIds = null, IUnitOfWork unitOfWork = null)
    {
        using var scope = _services.CreateScope();
        var _userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationIdentityUser>>();

        // We must resolve this as the scope will dispose.
        var result = await _userManager.Users
            .Where(s => includeInactive || s.IsActive && (includeUserIds == null || includeUserIds.Any(x => x == s.UserId)))
            .OrderBy(s => s.FirstName)
            .ThenBy(s => s.LastName)
            .SelectMany(u => _userManager.Users.Where(createdUser => createdUser.UserId == u.CreatedUserId).DefaultIfEmpty(), (user, createdUser) => new { user, createdUser })
            .SelectMany(u => _userManager.Users.Where(updatedUser => updatedUser.UserId == u.user.UpdatedUserId).DefaultIfEmpty(), (u, updatedUser) => new { u.user, u.createdUser, updatedUser })
            .ToListAsync();

        return result.Select(r =>
        {
            var user = r.user;
            var createdUser = r.createdUser;
            var updatedUser = r.updatedUser;

            if (createdUser != null)
            {
                user.CreatedUserName = $"{createdUser.FirstName} {createdUser.LastName}";
            }

            if (updatedUser != null)
            {
                user.UpdatedUserName = $"{updatedUser.FirstName} {updatedUser.LastName}";
            }

            return user;
        }).ToList();
    }

    public async Task<ApplicationIdentityUser> GetByIdAsync(int id)
    {
        using var scope = _services.CreateScope();
        var _userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationIdentityUser>>();

        return await _userManager.Users.SingleOrDefaultAsync(x => x.UserId == id);
    }

    public async Task<ApplicationIdentityUser> GetSingleAsync(string usernameOrEmail)
    {
        using var scope = _services.CreateScope();
        var _userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationIdentityUser>>();

        return _userManager.Users.SingleOrDefault(x => x.UserName == usernameOrEmail || x.Email == usernameOrEmail);
    }

    public Task<IdentityResult> CreateAsync(IUserContext userContext, ApplicationIdentityUser user)
    {
        user.CreatedUserId = userContext.UserId;
        return CreateAsync(user);
    }
    public async Task<IdentityResult> CreateAsync(ApplicationIdentityUser user)
    {
        user.CreatedDate = DateTime.UtcNow;

        using var scope = _services.CreateScope();
        var _userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationIdentityUser>>();
        return string.IsNullOrEmpty(user.Password)
            ? await _userManager.CreateAsync(user)
            : await _userManager.CreateAsync(user, user.Password);
    }

    public Task<IdentityResult> UpdateAsync(IUserContext userContext, ApplicationIdentityUser user)
    {
        user.UpdatedUserId = userContext.UserId;
        return UpdateAsync(user);
    }

    public async Task<IdentityResult> UpdateAsync(ApplicationIdentityUser user)
    {
        using var scope = _services.CreateScope();
        var _userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationIdentityUser>>();

        // We need to load/update the user in the same scope as the update as the loaded scope was disposed.
        var newUser = await _userManager.Users.SingleOrDefaultAsync(x => x.UserId == user.UserId);

        newUser.FirstName = user.FirstName;
        newUser.LastName = user.LastName;
        newUser.Email = user.Email;
        newUser.UserName = user.UserName;
        newUser.UserId = user.UserId;
        newUser.EmailConfirmed = user.EmailConfirmed;
        newUser.PhoneNumber = user.PhoneNumber;
        newUser.IsActive = user.IsActive;
        newUser.UpdatedUserId = user.UpdatedUserId;
        newUser.UpdatedDate = DateTime.UtcNow;

        var result = await _userManager.UpdateAsync(newUser);

        if (!string.IsNullOrEmpty(user.Password))
        {
            _ = await _userManager.RemovePasswordAsync(newUser);
            _ = await _userManager.AddPasswordAsync(newUser, user.Password);
        }

        return result;
    }

    public async Task<IdentityResult> UpdateAsync(IUserContext userContext, ProfileDto user)
    {
        using var scope = _services.CreateScope();
        var _userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationIdentityUser>>();

        // We need to load/update the user in the same scope as the update as the loaded scope was disposed.
        var newUser = await _userManager.Users.SingleAsync(x => x.UserId == user.UserId);

        newUser.FirstName = user.FirstName;
        newUser.LastName = user.LastName;
        newUser.UpdatedUserId = userContext?.UserId;
        newUser.UpdatedDate = DateTime.UtcNow;

        return await _userManager.UpdateAsync(newUser);
    }

    /// <inheritdoc cref="DeleteAsync(IUserContext, int, bool)"/>
    public Task<IdentityResult> DeleteAsync(int userId, bool remove = false)
    {
        return DeleteAsync(null, userId, remove);
    }

    /// <summary>
    /// Set user inactive
    /// </summary>
    public async Task<IdentityResult> DeleteAsync(IUserContext userContext, int userId, bool remove = false)
    {
        if (remove)
        {
            return await DeleteHardAsync(userId);
        }

        using var scope = _services.CreateScope();
        var _userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationIdentityUser>>();

        var updateUser = await _userManager.Users.SingleOrDefaultAsync(x => x.UserId == userId);
        updateUser.IsActive = false;
        updateUser.UpdatedDate = DateTime.UtcNow;
        updateUser.UpdatedUserId = userContext?.UserId;

        return await _userManager.UpdateAsync(updateUser);
    }

    private async Task<IdentityResult> DeleteHardAsync(int userId)
    {
        using var scope = _services.CreateScope();
        var _userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationIdentityUser>>();
        var updateUser = await _userManager.Users.SingleOrDefaultAsync(x => x.UserId == userId);
        return await _userManager.DeleteAsync(updateUser);
    }

}
