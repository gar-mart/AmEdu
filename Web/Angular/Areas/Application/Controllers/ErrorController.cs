using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Web.Filters;

using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Security.Users;

using Shared.Helpers;
using Shared.Web.Controllers;

namespace Web.Areas.Application.Controllers;

[Route("api/[area]/[controller]")]
[InvalidModelStateFilter]
[Area(nameof(Application))]
public sealed class ErrorController: ErrorController<ApplicationIdentityUser, DatabaseException>
{
    private readonly ErrorLogging _errorLogging;

    public ErrorController(ErrorLogging errorLogging, IOptions<AppConfigurations> appConfigurationOptions, ILogger<ErrorController> logger) : base(appConfigurationOptions.Value.IsProduction, logger)
    {
        _errorLogging = errorLogging;
    }

    protected override Task LogRequest(IExceptionHandlerFeature exceptionHandlerFeature)
    {
        try
        {
            return base.LogRequest(exceptionHandlerFeature);
        }
        finally
        {
            var ex = exceptionHandlerFeature.Error;
            _errorLogging.NotifyDevelopers(ex, ex.Message);
        }
    }
}
