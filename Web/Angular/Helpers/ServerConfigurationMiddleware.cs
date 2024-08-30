using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Web.Helpers;

public class ServerConfigurationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly AppConfigurations _appConfigurations;

    public ServerConfigurationMiddleware(RequestDelegate next, IOptions<AppConfigurations> appConfigurations)
    {
        _next = next;
        _appConfigurations = appConfigurations.Value;
    }

    public Task InvokeAsync(HttpContext context)
    {
        context.Response.Cookies.Append(nameof(_appConfigurations.Environment), _appConfigurations.Environment.ToString());
        return _next(context);
    }
}
