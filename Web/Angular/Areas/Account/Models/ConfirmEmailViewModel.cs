using Flurl;

using Repository.Repositories.Security.Users;

using Web.ViewModels;

namespace Web.Areas.Account.Models;

public sealed class ConfirmEmailViewModel: WebBaseEmailViewModel
{
    public ConfirmEmailViewModel(ApplicationIdentityUser user, string emailCode)
    {
        ButtonLink = ButtonLink.SetQueryParams(new { code = emailCode, emailAddress = user.Email });
        User = user;
    }

    public override string ButtonLink { get; set; } = "/account/confirm-email";
    public override string ButtonText { get; set; } = "Confirm Email";
    public ApplicationIdentityUser User { get; }
}
