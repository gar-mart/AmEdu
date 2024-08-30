using FD.Base.Shared.Web.Filters;
using FD.Base.Shared.Web.Models;

using Microsoft.AspNetCore.Mvc;

using Repository.Repositories.Security.Users;

namespace Web.Areas;

[Route("api/[area]/[controller]")]
[InvalidModelStateFilter]
public class ApiController: BaseController<ApplicationIdentityUser>
{
    protected override IActionResult InvalidModelState()
    {
        return BadRequest("Your input was invalid.");
    }
}
