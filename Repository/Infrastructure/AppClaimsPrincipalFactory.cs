using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

using Repository.Repositories.Security.Groups;
using Repository.Repositories.Security.Users;

using TimeZoneConverter;

using CommonUserRepository = Repository.Repositories.Common.User.UserRepository;

namespace Repository.Infrastructure;

public class AppClaimsPrincipalFactory: UserClaimsPrincipalFactory<ApplicationIdentityUser>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly CommonUserRepository _userRepository;
    private readonly GroupRepository _groupRepository;

    public AppClaimsPrincipalFactory(
        IHttpContextAccessor httpContextAccessor,
        UserManager<ApplicationIdentityUser> userManager,
        CommonUserRepository userRepository,
        IOptions<IdentityOptions> optionsAccessor,
        GroupRepository groupRepository
    ) : base(userManager, optionsAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _userRepository = userRepository;
        _groupRepository = groupRepository;
    }


    public override async Task<ClaimsPrincipal> CreateAsync(ApplicationIdentityUser identityUser)
    {
        var principal = await base.CreateAsync(identityUser);

        if (principal.Identity is ClaimsIdentity identity)
        {
            identityUser.InitializeContext();

            await AssignRoles(identityUser);

            identityUser.TimeZoneId = await GetTimeZoneId(identityUser);

            // Remove old TimeZoneId claim
            var claims = identity.Claims.ToArray();
            foreach (var item in claims.Where(s => s.Type == nameof(ApplicationIdentityUser.TimeZoneId)))
            {
                identity.RemoveClaim(item);
            }
            identity.AddClaims(identityUser.ConvertToClaims());
        }
        return principal;
    }

    private async Task<string> GetTimeZoneId(ApplicationIdentityUser identityUser)
    {
        var timeZoneId = string.Empty;
        var savedClaims = await UserManager.GetClaimsAsync(identityUser);
        var savedTimezoneIdClaim = savedClaims.FirstOrDefault(claim => claim.Type == nameof(ApplicationIdentityUser.TimeZoneId));

        if (_httpContextAccessor.HttpContext.Request.Cookies.TryGetValue(nameof(ApplicationIdentityUser.TimeZoneId), out var ianaTimeZoneId))
        {
            timeZoneId = TZConvert.IanaToWindows(ianaTimeZoneId);
            if (savedTimezoneIdClaim == null)
            {
                // have yet to save the timezone Id, save it now
                _ = await UserManager.AddClaimAsync(identityUser, new Claim(nameof(ApplicationIdentityUser.TimeZoneId), timeZoneId));
            }
            else if (timeZoneId != savedTimezoneIdClaim.Value)
            {
                // the timezone Id has changed since the last login, replace it with the new value
                _ = await UserManager.ReplaceClaimAsync(identityUser, savedTimezoneIdClaim, new Claim(nameof(ApplicationIdentityUser.TimeZoneId), timeZoneId));
            }
        }
        else if (savedTimezoneIdClaim != null)
        {
            // timezone Id does not exist in cookies, get it out of the database
            timeZoneId = savedTimezoneIdClaim.Value;
        }

        return timeZoneId;
    }

    private async Task AssignRoles(ApplicationIdentityUser identityUser)
    {
        // dynamically add users to the Mentor groups

        var (groups, userGroups, user) = await (
            _groupRepository.GetListAsync(),
            _groupRepository.GetListByUserAsync(identityUser.UserId),
            _userRepository.ReturnUserById(identityUser.UserId));

        // the groups are named the same as the roles
        var mentorGroup = groups.First(g => g.Name == UserRoles.Mentor);
        var secondaryMentorGroup = groups.First(g => g.Name == UserRoles.SecondaryMentor);

        userGroups = ConditionalGroupAssignment(mentorGroup, user.IsMentor, out var update1);
        userGroups = ConditionalGroupAssignment(secondaryMentorGroup, user.IsSecondaryMentor, out var update2);

        if (update1 || update2)
        {
            _ = await _groupRepository.SetUserGroupsAsync(identityUser.UserId, userGroups.Select(g => g.Id));
        }

        IEnumerable<GroupModel> ConditionalGroupAssignment(GroupModel group, bool assign, out bool update)
        {
            update = true;

            if (assign)
            {
                if (!userGroups.Any(g => g.Id == group.Id))
                {
                    // add the user to the group
                    return userGroups.Append(group);
                }
            }
            else
            {
                if (userGroups.Any(g => g.Id == group.Id))
                {
                    // remove the user from the group
                    return userGroups.Where(g => g.Id != group.Id);
                }
            }

            // no changes
            update = false;
            return userGroups;
        }
    }
}
