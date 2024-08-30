import { AuditEntityInterface } from "@models/repository/audit-entity.model";
import { email, maxLength, prop, required, rule } from "@rxweb/reactive-form-validators";
import { DotNetConstants } from "app/helpers/constants/dot-net.constants";
import { GroupInterface } from "../../admin/models/group.model";
import { RoleModel } from "../../admin/models/role.model";

export class ApplicationIdentityUser implements ApplicationIdentityUserInterface {
  @prop()
  id: string = DotNetConstants.EmptyGuid; // Guid

  @prop()
  userId: number = 0;

  @required()
  @maxLength({ value: 256 })
  userName = "";

  @maxLength({ value: 256 })
  @email()
  @rule({
    customRules: [
      (model: ApplicationIdentityUser) => {
        if (model.userName) {
          return null;
        }
        return { required: true };
      },
    ],
  })
  email = "";

  @required()
  @maxLength({ value: 50 })
  firstName = "";

  @required()
  @maxLength({ value: 50 })
  lastName = "";

  fullName = "";

  @prop()
  securityGroupList: string[] = []; // Guid[]

  @prop()
  emailConfirmed: boolean = false;

  @prop()
  isActive: boolean = true;

  @prop()
  securityGroups: GroupInterface[] = [];

  @prop()
  effectiveRoles: RoleModel[] = [];

  @prop()
  sendInvitation: boolean = false;

  @prop()
  @rule({
    customRules: [
      (model: ApplicationIdentityUser) => {
        if (!model.email && !model.password && model.id == DotNetConstants.EmptyGuid) {
          return { required: true };
        }
        return null;
      },
    ],
  })
  password: string;

  @prop()
  createdDate: Date;

  @prop()
  createdUserId: number;

  @prop()
  updatedUserId: number;

  @prop()
  updatedDate: Date;

  @prop()
  createdOrUpdatedDate: Date;

  @prop()
  createdOrUpdatedUserId: number;

  @prop()
  createdOrUpdatedUserName: string;

  @prop()
  createdUserInitials: string;

  @prop()
  createdUserName: string;

  @prop()
  updatedUserInitials: string;

  @prop()
  updatedUserName: string;

  public constructor(init?: Partial<ApplicationIdentityUser>) {
    Object.assign(this, init);
  }
}

export interface ApplicationIdentityUserInterface extends AuditEntityInterface {
  id: string; // Guid
  userId: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  securityGroupList: string[]; // Guid[]
  emailConfirmed: boolean;
  isActive: boolean;
  securityGroups: GroupInterface[];
  effectiveRoles: RoleModel[];
  sendInvitation: boolean;
}
