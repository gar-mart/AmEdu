using Flurl;

using Repository.Repositories.Security.Users;

using Web.ViewModels;

namespace Web.Areas.Security.Models;

public sealed class InvitationEmailViewModel: WebBaseEmailViewModel
{
    public InvitationEmailViewModel(ApplicationIdentityUser user, string emailCode)
    {
        ButtonLink = ButtonLink.SetQueryParams(new { code = emailCode, emailAddress = user.Email, setupUser = true });
        User = user;
    }

    public override string ButtonLink { get; set; } = "/account/reset-password";
    public override string ButtonText { get; set; } = "Create Password";
    public ApplicationIdentityUser User { get; }
}
