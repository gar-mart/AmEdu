namespace Repository.Infrastructure;

public static class UserRoles
{
    public const string FdAdmin = nameof(FdAdmin);
    public const string Admin_Users_View = nameof(Admin_Users_View);
    public const string Admin_Users_Edit = nameof(Admin_Users_Edit);
    public const string Admin_SecurityGroups_View = nameof(Admin_SecurityGroups_View);
    public const string Admin_SecurityGroups_Edit = nameof(Admin_SecurityGroups_Edit);
    public const string Admin_Localization_View = nameof(Admin_Localization_View);
    public const string Admin_Localization_Edit = nameof(Admin_Localization_Edit);
    public const string Admin_ImpersonateUser = nameof(Admin_ImpersonateUser);

    // These roles do not follow our standard role names because they come from the Portal for backwards compatibility
    public const string Staff = nameof(Staff);
    public const string Admin = nameof(Admin);
    public const string Mentor = nameof(Mentor);
    public const string SecondaryMentor = "Secondary Mentor";
    public const string Teacher = nameof(Teacher);
    public const string ReFuelCoordinator = "ReFuel Coordinator";
    public const string Interventionist = nameof(Interventionist);
}
