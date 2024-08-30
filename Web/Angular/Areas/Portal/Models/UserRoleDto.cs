namespace Web.Areas.Portal.Models;

public class UserRoleDto
{
    public int Id { get; set; }
    public bool? IsAdmin { get; set; }
    public bool? IsTeacher { get; set; }
    public bool? IsReFuelCoordinator { get; set; }
    public bool? IsInterventionist { get; set; }
}
