using FD.Base.Shared.Settings;

namespace Repository.Infrastructure.Settings;
public class ConnexusSettings: BaseSettings
{
    public int DomainId { get; set; }
    public string Domain { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string Endpoint { get; set; }
}
