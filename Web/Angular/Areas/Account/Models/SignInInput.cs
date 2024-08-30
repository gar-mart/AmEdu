using System.ComponentModel.DataAnnotations;

namespace Web.Areas.Account.Models;

public sealed class SignInInput
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }
    public bool RememberMe { get; set; }
    public bool Backdoor { get; set; }
}
