using System.Security.Claims;

using FD.Base.Shared.Helpers;
using FD.Base.Shared.Models;

using Microsoft.AspNetCore.Http;

using Repository.Repositories.Security.Users;

namespace Web.Helpers;

public class RazorHelper: IRazorHelper<ApplicationIdentityUser>, IRazorHelper
{
    public const string TEMP_LOGIN_CLAIM = nameof(TEMP_LOGIN_CLAIM); // use this claim to bypass UserContext logic. Useful when the user has claims but isn't yet authenticated

    private readonly IHttpContextAccessor _httpContextAccessor;
    private ApplicationIdentityUser _userContext;

    public HttpContext HttpContext => _httpContextAccessor.HttpContext;

    public RazorHelper(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    IUserContext IRazorHelper<IUserContext>.UserContext => UserContext;
    public ApplicationIdentityUser UserContext
    {
        get
        {
            if (_userContext == null && HttpContext.User.Identity.IsAuthenticated)
            {
                _userContext = new ApplicationIdentityUser(HttpContext.User);
            }
            return _userContext;
        }
        set => _userContext = value;
    }

    ClaimsPrincipal IRazorHelper<IUserContext>.User => User;
    public ClaimsPrincipal User => HttpContext.User;
}