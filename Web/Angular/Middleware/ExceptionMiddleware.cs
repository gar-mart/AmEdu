using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

using Shared.Helpers;

namespace Api.Middleware;

public static class ExceptionMiddlewareExtensions
{
    public static void ConfigureCustomExceptionMiddleware(this IApplicationBuilder app)
    {
        _ = app.UseMiddleware<ExceptionMiddleware>();
    }
}

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext httpContext, ErrorLogging errorLogging)
    {
        try
        {
            await _next(httpContext);
        }
        catch (Exception ex)
        {
            try
            {
                HandleExceptionAsync(ex, errorLogging);
            }
            catch (Exception innerEx)
            {
                var innerError = $"{ex.Message} (HandleException error: {innerEx})";
                throw new Exception(innerError, ex);
            }

            throw;
        }
    }

    private static void HandleExceptionAsync(Exception exception, ErrorLogging errorLogging)
    {
        errorLogging.NotifyDevelopers(exception, exception.Message);
    }
}
