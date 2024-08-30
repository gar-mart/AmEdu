using FD.Base.Shared.Helpers;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Repository.Infrastructure;
using Repository.Repositories.Security.Groups;
using Repository.Repositories.Security.Users;

namespace AutomatedTests;

public class Startup: AppStartup
{
    public IConfiguration Configuration { get; private set; }

    public void ConfigureHost(IHostBuilder hostBuilder)
    {
        _ = hostBuilder
        .ConfigureHostConfiguration(builder => _ = builder.AddJsonFile("appsettings.json"))
        .ConfigureServices((context, services) => Configuration = context.Configuration);
    }

    public void ConfigureServices(IServiceCollection services)
    {
        _ = AddServices(services, Configuration)
        .AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("SliceConnection")))
        .AddIdentity<ApplicationIdentityUser, RoleModel>()
        .AddEntityFrameworkStores<ApplicationDbContext>();

        _ = services.AddScoped<IRazorHelper, MockRazorHelper>()
            .AddScoped<IRazorHelper<ApplicationIdentityUser>, MockRazorHelper>();
    }

    public void Configure(IServiceScopeFactory serviceScopeFactory)
    {
        BaseServiceActivator.Configure(serviceScopeFactory);
    }
}
