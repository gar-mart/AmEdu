using System.Security.Claims;

using FD.Base.Shared.Helpers;
using FD.Base.Shared.Models;

using Repository.Repositories.Security.Users;

namespace AutomatedTests;
public class MockRazorHelper: IRazorHelper<ApplicationIdentityUser>, IRazorHelper
{
    private ApplicationIdentityUser _userContext;
    IUserContext IRazorHelper<IUserContext>.UserContext => UserContext;
    public ApplicationIdentityUser UserContext
    {
        get
        {
            _userContext ??= new ApplicationIdentityUser();
            return _userContext;
        }
        set => _userContext = value;
    }

    public ClaimsPrincipal User => null;
}
