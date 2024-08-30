using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.SignalR;

using Repository.Repositories.Security.Users;

namespace Web.Areas;

public class ApiHub<T>: Hub<T> where T : class
{
    private ApplicationIdentityUser _userContext;

    /// <summary>
    /// Gets the currently executing UserContext.
    /// </summary>
    // DI does not work inside a Hub unfortunately, so we can't inject RazorHelper
    protected virtual ApplicationIdentityUser UserContext
    {
        get
        {
            if (_userContext == null && Context.User.Identity.IsAuthenticated)
            {
                _userContext = new ApplicationIdentityUser(Context.User);
            }
            return _userContext;
        }
        set => _userContext = value;
    }

    public override async Task OnConnectedAsync()
    {
        if (Context.User.Identity.IsAuthenticated)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"{nameof(UserContext.UserId)}:{UserContext.UserId}");
        }

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        if (Context.User.Identity.IsAuthenticated)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"{nameof(UserContext.UserId)}:{UserContext.UserId}");
        }

        await base.OnDisconnectedAsync(exception);
    }
}
