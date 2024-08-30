using System;

using Shared.Buzz;
using Shared.Buzz.Schemas;

namespace Repository.Repositories.Common.User;

/// <summary>
/// The structure of this class must conform to the TVP Common.BuzzUser
/// </summary>
internal class BuzzUserTvp
{
    internal BuzzUserTvp(BuzzUser user, ApiType apiType)
    {
        switch (apiType)
        {
            case ApiType.Connexus:
                ConnexusId = long.Parse(user.Id);
                break;
            case ApiType.LincolnLearning:
                LincolnLearningId = long.Parse(user.Id);
                break;
            case ApiType.FlexPoint:
                FlexPointId = long.Parse(user.Id);
                break;
            default:
                throw new NotImplementedException(apiType.ToString());
        }

        Email = user.Email;
        Accomodations = user.Accomodations;
    }

    public long? ConnexusId { get; set; }
    public long? LincolnLearningId { get; set; }
    public long? FlexPointId { get; set; }
    public string Email { get; set; }
    public string Accomodations { get; set; }
}
