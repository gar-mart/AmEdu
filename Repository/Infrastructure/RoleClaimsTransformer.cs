using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authentication;

using Repository.Repositories.Security.Groups;

namespace Repository.Infrastructure;

public class RoleClaimsTransformer: IClaimsTransformation
{
    private readonly GroupRepository _groupRepository;

    public RoleClaimsTransformer(GroupRepository groupRepository)
    {
        _groupRepository = groupRepository;
    }

    public async Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
    {
        var identity = (ClaimsIdentity)principal.Identity;

        if (identity.AuthenticationType == "Identity.Application")
        {
            var id = int.Parse(principal.Claims.Single(s => s.Type == "UserId").Value);

            // This can be improved to cache in memory and check ApplicationIdentityUser.IsStale
            var roles = await _groupRepository.GetEffectiveRolesForUserAsync(id);

            identity.AddClaims(roles.Select(s => new Claim(identity.RoleClaimType, s)));
        }

        return principal;
    }
}