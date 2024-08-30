import { UserRoles } from "app/enums/repository/user-roles.enum";
import { Constants } from "app/shared";

/** The cached data contract for the current user */
export interface UserDtoInterface {
  id: string;
  impersonatingIdentityId?: string;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  emailConfirmed: boolean;
  roles: string[];

  isStaff: boolean;
  isTeacher: boolean;
  isAdmin: boolean;
  isInterventionist: boolean;
  isReFuelCoordinator: boolean;
  isMentor: boolean;
  isSecondaryMentor: boolean;
  counselorAssignments?: string[];
  gradeLevel: string;

  signInProvider?: "Microsoft" | "Google";

  isInRole: (...role: string[]) => boolean;
  hasAnyViewRole: (rolePrefix: string) => boolean;
}

export class UserDtoModel implements UserDtoInterface {
  id: string;
  impersonatingIdentityId?: string;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  emailConfirmed: boolean;
  roles: string[];
  gradeLevel: string;
  counselorAssignments?: string[];

  get isStaff() {
    return this.isInRole(UserRoles.Staff);
  }
  get isTeacher() {
    return this.isStaff && this.isInRole(UserRoles.Teacher);
  }
  get isAdmin() {
    return this.isStaff && this.isInRole(UserRoles.Admin);
  }
  get isInterventionist() {
    return this.isStaff && this.isInRole(UserRoles.Interventionist);
  }
  get isReFuelCoordinator() {
    return this.isStaff && this.isInRole(UserRoles.ReFuelCoordinator);
  }
  get isMentor() {
    return this.isStaff && this.isInRole(UserRoles.Mentor);
  }
  get isSecondaryMentor() {
    return this.isStaff && this.isInRole(UserRoles.SecondaryMentor);
  }

  /** todo: remove once AmEdu fully transitions to Google */
  get signInProvider() {
    if (new Date() > new Date(2023, 6, 28)) {
      return "Google"; // always return Google if it's after July 28, 2023
    }

    return localStorage.getItem(Constants.loginProvider) as "Microsoft" | "Google";
  }

  /**
   * Returns true if the logged in user has any "view" role with the provided prefix or if `rolePrefix` is falsey.
   * @param role
   */
  hasAnyViewRole(rolePrefix: string) {
    if (!rolePrefix) {
      return true;
    }

    return this.roles && this.roles.some(r => r.startsWith(rolePrefix));
  }

  /**
   * Returns true if the logged in user has any of the provided role or if `role` is falsey.
   * @param role
   */
  isInRole(...role: string[]) {
    if (!role || role[0] == undefined) {
      return true;
    }
    return this.roles && this.roles.some(r => role.indexOf(r) !== -1);
  }
}
