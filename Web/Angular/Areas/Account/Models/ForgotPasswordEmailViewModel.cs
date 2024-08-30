using Flurl;

using Repository.Repositories.Security.Users;

using Web.ViewModels;

namespace Web.Areas.Account.Models;

public sealed class ForgotPasswordEmailViewModel: WebBaseEmailViewModel
{
    public ForgotPasswordEmailViewModel(ApplicationIdentityUser user, string emailCode)
    {
        ButtonLink = ButtonLink.SetQueryParams(new { code = emailCode, emailAddress = user.Email });
        User = user;
    }

    public override string ButtonLink { get; set; } = "/account/reset-password";
    public override string ButtonText { get; set; } = "Reset Password";
    public ApplicationIdentityUser User { get; }
}
