using FD.Base.Shared.Web.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Repository.Repositories.Security.Users;

namespace Api.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ApiControllerBase: BaseController<ApplicationIdentityUser>
{
}
