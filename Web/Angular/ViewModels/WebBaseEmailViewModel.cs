using FD.Base.Shared.Web.Models;

namespace Web.ViewModels;

public class WebBaseEmailViewModel: BaseEmailViewModel
{
    public WebBaseEmailViewModel() { }
    public WebBaseEmailViewModel(string toName) : base(toName) { }

    public override string ButtonLink { get; set; } = "/login";
    public override string ButtonText { get; set; } = "Login";
}
