using FD.Base.Shared.Settings;

namespace Repository.Infrastructure.Settings;
public class EmailNotificationsSettings: BaseSettings
{
    public string[] OrientationComplete { get; set; }
}
