using FD.Base.Shared.Settings;

namespace Repository.Infrastructure.Settings;

public class ReCaptchaKeySettings: BaseSettings
{
    public string SiteKey { get; set; }
    public string SecretKey { get; set; }
}
