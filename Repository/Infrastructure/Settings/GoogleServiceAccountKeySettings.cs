using FD.Base.Shared.Settings;

using Newtonsoft.Json;

namespace Repository.Infrastructure.Settings;
public class GoogleServiceAccountKeySettings: BaseSettings
{
    private string _privateKey;

    [JsonProperty("type")]
    public string Type { get; set; }
    [JsonProperty("project_id")]
    public string ProjectId { get; set; }
    [JsonProperty("private_key_id")]
    public string PrivateKeyId { get; set; }
    [JsonProperty("private_key")]
    public string PrivateKey
    {
        get => _privateKey;
        set => _privateKey = value?.Replace("\\n", "\n"); // \n in the string needs to be an actual newline character
    }
    [JsonProperty("client_email")]
    public string ClientEmail { get; set; }
    [JsonProperty("client_id")]
    public string ClientId { get; set; }
    [JsonProperty("auth_uri")]
    public string AuthUri { get; set; }
    [JsonProperty("token_uri")]
    public string TokenUri { get; set; }
    [JsonProperty("auth_provider_x509_cert_url")]
    public string AuthProviderx509CertUrl { get; set; }
    [JsonProperty("client_x509_cert_url")]
    public string Clientx509CertUrl { get; set; }
    [JsonProperty("universe_domain")]
    public string UniverseDomain { get; set; }

    // this is related to the Google settings, but is not part of the google credentials
    [JsonIgnore]
    public string CustomerId { get; set; }
}
