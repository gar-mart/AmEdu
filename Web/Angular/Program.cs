using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Web;

public class Program
{
    public static void Main(string[] args)
    {
        var host = CreateHostBuilder(args).Build();
        host.Run();
    }


    public static IHostBuilder CreateHostBuilder(string[] args)
    {
        return Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder => _ = webBuilder.UseStartup<Startup>());
    }
}
