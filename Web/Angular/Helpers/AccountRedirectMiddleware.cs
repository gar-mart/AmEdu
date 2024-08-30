using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;


using FD.Base.Shared.Helpers;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Security.Users;

namespace Web.Helpers;

public class AccountRedirectMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<AccountRedirectMiddleware> _logger;
    private readonly IJsonHelper _jsonHelper;
    private readonly AppConfigurations _appConfigurations;

    public AccountRedirectMiddleware(RequestDelegate next, IOptions<AppConfigurations> appConfigurations, ILogger<AccountRedirectMiddleware> logger, IJsonHelper jsonHelper)
    {
        _next = next;
        _logger = logger;
        _jsonHelper = jsonHelper;
        _appConfigurations = appConfigurations.Value;
    }

    public async Task InvokeAsync(HttpContext context, IRazorHelper<ApplicationIdentityUser> razorHelper, SignInManager<ApplicationIdentityUser> signInManager)
    {
        if (context.User.Identity.IsAuthenticated)
        {
            _logger.LogInformation("Signed in user: {user}", _jsonHelper.Serialize(razorHelper.UserContext).ToString());

            // Check to see if the user needs to be updated before preforming redirect checks. 
            // This prevents requiring a re-login to update their claims.
            if (razorHelper.UserContext.IsStale)
            {
                var user = await signInManager.UserManager.GetUserAsync(razorHelper.User);

                if (user == null)
                {
                    await signInManager.SignOutAsync();
                    context.Response.Redirect(context.Request.Path);
                    return;
                }

                var identity = (ClaimsIdentity)razorHelper.User.Identity;

                // Update persistent state
                await signInManager.RefreshSignInAsync(user);

                // Update for this request
                var claims = identity.Claims.ToArray();
                foreach (var item in claims.Where(s => s.Type != ClaimTypes.Role))
                {
                    identity.RemoveClaim(item);
                }

                identity.AddClaims((await signInManager.ClaimsFactory.CreateAsync(user)).Claims);

                ((RazorHelper)razorHelper).UserContext = null;
            }
        }

        await _next.Invoke(context).ConfigureAwait(true);
    }
}
