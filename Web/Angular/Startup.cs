using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

using FD.Base.Shared.Extensions;
using FD.Base.Shared.Helpers;
using FD.Base.Shared.Repository.Infrastructure.Helpers;
using FD.Base.Shared.Web.Converters;
using FD.Base.Shared.Web.Filters;
using FD.Base.Shared.Web.Helpers;
using FD.Base.Shared.Web.Services;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.DataAnnotations;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Security.Groups;
using Repository.Repositories.Security.Users;

using Rotativa.AspNetCore;

using Web.Areas.Account.Hubs;
using Web.Helpers;

namespace Web;

public class Startup: AppStartup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        // Enable logging of potential PII messages (Personally Identifiable Information)
        Microsoft.IdentityModel.Logging.IdentityModelEventSource.ShowPII = Debugger.IsAttached;

        if (!Debugger.IsAttached)
        {
            // the following code is necessary to persist user authentication between slot swaps. This can be removed in projects where this is not applicable.
            // Create a "data-protection" private blob container to implement.
            _ = services.AddDataProtection()
              .SetApplicationName("AmEdu Portal")
              .PersistKeysToAzureBlobStorage(Configuration["AzureStorage:ConnectionString"], "data-protection", "data-protection-keys");
        }

        _ = services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(Configuration["ConnectionStrings:IdentityConnection"] ?? Configuration["ConnectionStrings:DefaultConnection"], b => b.MigrationsAssembly("Angular")));

        // add identity
        _ = services.AddIdentity<ApplicationIdentityUser, RoleModel>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

        // Configure Identity options and password complexity here
        _ = services.Configure<IdentityOptions>(options =>
        {
            // User settings
            //options.User.RequireUniqueEmail = true; // Emails and usernames are unique outside of this setting. Disabled to enable users with no email.

            // Password settings
            options.Password.RequireDigit = true;
            options.Password.RequiredLength = 6;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = true;
            options.Password.RequireLowercase = true;
            options.Password.RequiredUniqueChars = 3;

            // Lockout settings
            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
            options.Lockout.MaxFailedAccessAttempts = 5;
        });

        // don't redirect the user on unauthorization - return a suitable status code instaed.
        _ = services.ConfigureApplicationCookie(options =>
        {
            options.Events.OnRedirectToAccessDenied = context =>
            {
                context.Response.StatusCode = context.HttpContext.User.Identity.IsAuthenticated ? StatusCodes.Status403Forbidden : StatusCodes.Status401Unauthorized;
                return Task.CompletedTask;
            };

            options.Events.OnRedirectToLogin = options.Events.OnRedirectToAccessDenied;
        });

        _ = services.AddScoped<IUserClaimsPrincipalFactory<ApplicationIdentityUser>, AppClaimsPrincipalFactory>()
            .AddAuthentication()
            .AddMicrosoftAccount(microsoftOptions =>
            {
                var tenantId = Configuration["Authentication:Microsoft:TenantId"];
                if (!string.IsNullOrEmpty(tenantId))
                {
                    // these two lines are required for single tenant sign on authorization
                    microsoftOptions.AuthorizationEndpoint = microsoftOptions.AuthorizationEndpoint.Replace("common", tenantId);
                    microsoftOptions.TokenEndpoint = microsoftOptions.TokenEndpoint.Replace("common", tenantId);
                }
                // ?prompt=select_account forces the user to choose an account on sign in even if signed into a single account.
                microsoftOptions.AuthorizationEndpoint += "?prompt=select_account";
                microsoftOptions.ClientId = Configuration["Authentication:Microsoft:ClientId"];
                microsoftOptions.ClientSecret = Configuration["Authentication:Microsoft:ClientSecret"];
            }).AddGoogle(googleOptions =>
            {
                googleOptions.ClientId = Configuration["Authentication:Google:ClientId"];
                googleOptions.ClientSecret = Configuration["Authentication:Google:ClientSecret"];
            });

        _ = services.AddAuthorization();

        _ = services.AddResponseCompression(options => options.EnableForHttps = true);

        _ = services.AddControllersWithViews(x =>
        {
            x.ModelBinderProviders.Insert(0, new ScrubbingModelBinderProvider());
        })
            .AddRazorRuntimeCompilation()
            .AddJsonOptions(options =>
            {
                // custom DateTime converter to make all DateTimes received by the client UTC
                options.JsonSerializerOptions.Converters.Add(new DateTimeJsonConverter());
                options.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter());
                options.JsonSerializerOptions.Converters.Add(new TimeOnlyJsonConverter());

                options.JsonSerializerOptions.WriteIndented = Debugger.IsAttached;
            })
            .AddRinMvcSupport();

        _ = services.AddEndpointsApiExplorer()
            .AddSwaggerGen(c =>
            {
                c.TagActionsBy(api =>
                {
                    if (api.ActionDescriptor is ControllerActionDescriptor actionDescriptor)
                    {
                        var group = actionDescriptor.ControllerTypeInfo.GetCustomAttribute<AreaAttribute>();

                        return group != null
                            ? new List<string> { $"{group.RouteValue} / {actionDescriptor.ControllerName}" }
                            : new List<string> { actionDescriptor.ControllerName };
                    }

                    throw new NullReferenceException("Couldn't find the group name");
                });
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
            });
        _ = services.AddRin();

        _ = services.ConfigureOptions<ConfigureJsonOptions>();

        // In production, the Angular files will be served from this directory
        services.AddSpaStaticFiles(configuration => configuration.RootPath = "ClientApp/dist/AmEduEnrollmentWeb");

        _ = services.AddSignalR();
        _ = services.AddAutoMapper(typeof(Startup));

        _ = AddServices(services, Configuration)
            .AddSingleton<IValidationAttributeAdapterProvider, CustomValidationAttributeAdapterProvider>()
            .AddScoped<IRazorHelper, RazorHelper>()
            .AddScoped<IRazorHelper<ApplicationIdentityUser>, RazorHelper>()
            .AddSingleton<IViewRenderService, ViewRenderService>()
            .AddScoped<AllowByIpFilter>();
        ;
    }


    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    [Obsolete]
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
    {
        var appConfigurations = app.ApplicationServices.GetService<IOptions<AppConfigurations>>().Value;
        appConfigurations.Environment = env.IsEnvironment("Local")
            ? AppEnvironment.Local : env.IsDevelopment()
            ? AppEnvironment.Development : env.IsProduction()
            ? AppEnvironment.Production
            : AppEnvironment.Testing;

        _ = app.UseResponseCompression();

        if (appConfigurations.Environment is AppEnvironment.Development or AppEnvironment.Local)
        {
            app.UseRin();
            _ = app.UseSwagger();
            _ = app.UseSwaggerUI();
            app.UseRinMvcSupport();
            app.UseRinDiagnosticsHandler();
        }
        else
        {
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            _ = app.UseHsts();
        }

        _ = app.UseExceptionHandler("/api/Application/Error");
        var tempEnv = new TempHostClass
        {
            ApplicationName = env.ApplicationName,
            ContentRootFileProvider = env.ContentRootFileProvider,
            ContentRootPath = env.ContentRootPath,
            EnvironmentName = env.EnvironmentName,
            WebRootFileProvider = env.WebRootFileProvider,
            WebRootPath = env.ContentRootPath
        };
        RotativaConfiguration.Setup(tempEnv, Directory.Exists("/etc") ? "/usr/bin/" : "Rotativa\\");
        BaseServiceActivator.Configure(app.ApplicationServices);

        // configure *.webmanifest as content resource otherwise .NET Core will assume the request is just another Angular route
        var contentTypeProvider = new FileExtensionContentTypeProvider();
        contentTypeProvider.Mappings[".webmanifest"] = "application/manifest+json";
        var staticFileOptions = new StaticFileOptions { ContentTypeProvider = contentTypeProvider };

        _ = app.UseStaticFiles(staticFileOptions);
        if (!env.IsDevelopment())
        {
            app.UseSpaStaticFiles(staticFileOptions);
        }

        _ = app.UseAuthentication(); // required for external sign in providers

        _ = app.UseRouting();

        _ = app.UseAuthorization();

        _ = app.UseMiddleware<AccountRedirectMiddleware>();

        _ = app.UseEndpoints(endpoints =>
        {
            _ = endpoints.MapControllerRoute(
                name: "default",
                pattern: "{area}/{controller}/{action=Index}/{id?}");

            _ = endpoints.MapHub<AccountHub>($"api/{AccountHub.Route}");
        });

        _ = app.UseMiddleware<ServerConfigurationMiddleware>();

        app.UseSpa(spa =>
        {
            // To learn more about options for serving an Angular SPA from ASP.NET Core,
            // see https://go.microsoft.com/fwlink/?linkid=864501

            spa.Options.SourcePath = "ClientApp";

            if (Debugger.IsAttached)
            {
                // Live reload not working for .net5 and ng11 for now,
                // see https://github.com/dotnet/aspnetcore/issues/29478

                var runAngularAppSeparately = true;

                if (runAngularAppSeparately)
                {
                    // in the ClientApp folder, run the command "npm start"
                    // Use this instead to use the angular cli server
                    // We are using 127.0.0.1 instead of localhost for performance reasons
                    // the port number should match the one specified in ClientApp/angular.json
                    spa.UseProxyToSpaDevelopmentServer("http://127.0.0.1:4261");
                }
                else
                {
                    spa.UseAngularCliServer(npmScript: "start");
                    spa.Options.StartupTimeout = TimeSpan.FromSeconds(300); // Increase the timeout if angular app is taking longer to startup
                }
            }
        });

        _ = ConfigureAsync(app);
    }

    [Obsolete("Still using IHostingEnvironment to support Rotativa")]
    public class TempHostClass: Microsoft.AspNetCore.Hosting.IHostingEnvironment
    {
        public string ApplicationName { get; set; }
        public IFileProvider ContentRootFileProvider { get; set; }
        public string ContentRootPath { get; set; }
        public string EnvironmentName { get; set; }
        public IFileProvider WebRootFileProvider { get; set; }
        public string WebRootPath { get; set; }
    }
}
