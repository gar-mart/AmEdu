using System;

using Newtonsoft.Json;

using Shared.Converters;

namespace Shared.Buzz.Schemas;

public class BuzzUser
{
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string DomainId { get; set; }
    public string Reference { get; set; }
    public Guid Guid { get; set; }
    public string Email { get; set; }
    public EntityFlags Flags { get; set; }
    public DateTime LastPasswordChangeDate { get; set; }
    public DateTime FirstLoginDate { get; set; }
    public DateTime LastLoginDate { get; set; }
    public string CreationBy { get; set; }
    public DateTime ModifiedDate { get; set; }
    public string ModifiedBy { get; set; }
    public string Version { get; set; }
    public string Username { get; set; }

    public UserData Data { get; set; }

    [JsonConverter(typeof(JsonPathConverter))]
    public class UserData
    {
        [JsonProperty("iep.$value")]
        public string PathToIep { get; set; }
        [JsonProperty("504.$value")]
        public string PathTo504 { get; set; }
    }

    /// <summary>
    /// Related to IEP and 504 plans.
    /// </summary>
    /// <remarks>
    /// This is not set in the initial request. It is set after a call to GetResource using either
    /// <see cref="UserData.PathTo504"/> or <see cref="UserData.PathToIep"/>
    /// </remarks>
    public string Accomodations { get; set; }
}
