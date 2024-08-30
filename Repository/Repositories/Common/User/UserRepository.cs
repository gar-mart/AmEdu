using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

using Shared.Buzz;
using Shared.Buzz.Schemas;
using Shared.Extensions.Tasks;

namespace Repository.Repositories.Common.User;

public class UserRepository: BaseAppRepository<UserItem>
{
    public UserRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<UserRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<bool> ImportUsersAsync(IEnumerable<UserItem> users)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.ImportUsers")
            .AddModel(new
            {
                userList = users.CreateDataTable(
                    u => u.GoogleId,
                    u => u.Email,
                    u => u.FirstName,
                    u => u.LastName,
                    u => u.IsStaff
                )
            })
            .ExecuteCommonAsync();
    }

    public Task<bool> SetAdmin(int userId, bool isAdmin)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.SetAdmin")
            .AddModel(new { userId, isAdmin })
            .ExecuteCommonAsync();
    }

    public Task<bool> SetTeacher(int userId, bool isTeacher)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.SetTeacher")
            .AddModel(new { userId, isTeacher })
            .ExecuteCommonAsync();
    }

    public Task<bool> SetReFuelCoordinator(int userId, bool isReFuelCoordinator)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.SetReFuelCoordinator")
            .AddModel(new { userId, isReFuelCoordinator })
            .ExecuteCommonAsync();
    }

    public Task<bool> SetInterventionist(int userId, bool isInterventionist)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.SetInterventionist")
            .AddModel(new { userId, isInterventionist })
            .ExecuteCommonAsync();
    }

    public Task<bool> SetProfilePicture(int userId, string profilePicture)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.SetProfilePicture")
            .AddModel(new { userId, profilePicture })
            .ExecuteCommonAsync();
    }

    public async Task<UserItem> ReturnUserByUserName(string userName)
    {
        return await CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.ReturnUserByUserName")
            .AddModel(new { userName })
            .QueryMultipleAsync<UserItem, string>()
            .Then(result =>
            {
                var user = result.Item1.FirstOrDefault() ?? new UserItem();
                user.CounselorAssignments.AddRange(result.Item2);
                return user;
            });
    }

    public async Task<UserItem> ReturnUserById(int userId)
    {
        return (await CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.ReturnUserById")
            .AddModel(new { userId })
            .QuerySingleAsync<UserItem>()) ?? new UserItem();
    }

    public Task<UserItem> ReturnUserByGoogleId(string googleId)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.ReturnUserByGoogleId")
            .AddModel(new { googleId })
            .QueryMultipleAsync<UserItem, string>()
            .Then(result =>
            {
                var user = result.Item1.FirstOrDefault();
                user?.CounselorAssignments.AddRange(result.Item2);
                return user;
            });
    }

    public Task<bool> ImportBuzzUsersAsync(IEnumerable<BuzzUser> users, ApiType apiType)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.ImportBuzzUsers")
            .Add(nameof(users), users.Select(user => new BuzzUserTvp(user, apiType)).CreateDataTable(), DbType.Object)
            .WithCommandTimeout(600) 
            .ExecuteCommonAsync();
    }
}
