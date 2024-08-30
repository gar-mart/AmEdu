using System.ComponentModel.DataAnnotations;

namespace Web.Areas.Account.Models;

public sealed class RegistrationInput
{
    [Required, MaxLength(80)]
    public string FirstName { get; set; }
    [Required, MaxLength(80)]
    public string LastName { get; set; }
    [Required, MaxLength(256), EmailAddress]
    public string EmailAddress { get; set; }
    [Required]
    public string Password { get; set; }
}
