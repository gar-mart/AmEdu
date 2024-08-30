/**
 *  Client version of Repository/Infrastructure/UserRoles.cs
 *  TODO: Code generation - for now, we will have to manually update both files so that they match
 */
export enum UserRoles {
  FdAdmin = "FdAdmin",
  Admin_Users_View = "Admin_Users_View",
  Admin_Users_Edit = "Admin_Users_Edit",
  Admin_SecurityGroups_View = "Admin_SecurityGroups_View",
  Admin_SecurityGroups_Edit = "Admin_SecurityGroups_Edit",
  Admin_Localization_View = "Admin_Localization_View",
  Admin_Localization_Edit = "Admin_Localization_Edit",
  Admin_ImpersonateUser = "Admin_ImpersonateUser",

  Admin = "Admin",
  Staff = "Staff",
  Interventionist = "Interventionist",
  ReFuelCoordinator = "ReFuel Coordinator",
  Mentor = "Mentor",
  Teacher = "Teacher",
  SecondaryMentor = "Secondary Mentor",
}
