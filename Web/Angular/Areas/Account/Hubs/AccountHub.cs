using System.Threading.Tasks;

using FD.Base.Shared.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SignalR;

using Repository.Repositories.Security.Users;

namespace Web.Areas.Account.Hubs;

[Authorize]
public sealed class AccountHub: ApiHub<IAccountHub>
{
    /// <summary>
    /// Used in <see cref="Startup"/> for the <see cref="HubEndpointRouteBuilderExtensions.MapHub{THub}(IEndpointRouteBuilder, string)"/> registration.
    /// </summary>
    /// <remarks>
    /// "api/" is prepended to the registration.
    /// </remarks>
    public const string Route = "account/hub";

    public static Task RefreshUsersAsync(IHubContext<AccountHub, IAccountHub> accountHub, int? userId = null)
    {
        if (userId.HasValue)
        {
            ApplicationIdentityUser.MarkUserStale(userId.Value);
            return accountHub.Clients.Group($"{nameof(IUserContext.UserId)}:{userId}").Refresh();
        }
        else
        {
            ApplicationIdentityUser.MarkAllUsersStale();
            return accountHub.Clients.All.Refresh();
        }
    }
}

public interface IAccountHub
{
    Task Refresh();
}
