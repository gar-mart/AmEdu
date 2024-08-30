using System.ComponentModel.DataAnnotations;

namespace Web.Areas.Account.Models;

public sealed class ResetPasswordInput
{
    [Required]
    public string EmailAddress { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string Code { get; set; }
}
