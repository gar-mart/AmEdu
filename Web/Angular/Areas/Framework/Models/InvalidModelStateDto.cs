using System.ComponentModel.DataAnnotations;

namespace Web.Areas.Framework.Models;

public class InvalidModelStateDto
{
    [Required, Display(Name = "Required String")]
    public string RequiredString { get; set; }

    [Range(1, 100), Display(Name = "Value 1 to 100")]
    public int Value1To100 { get; set; }
}
