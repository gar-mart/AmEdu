import { AuditEntityInterface, AuditEntityModel } from "@models/repository/audit-entity.model";
import { maxLength, prop, required } from "@rxweb/reactive-form-validators";
import { DotNetConstants } from "app/helpers/constants/dot-net.constants";
import { ApplicationIdentityUserInterface } from "../../account/models/application-identity-user.model";
import { RoleModel } from "./role.model";

export class GroupModel extends AuditEntityModel implements GroupInterface {
  @prop()
  id: string = DotNetConstants.EmptyGuid;

  @required()
  @maxLength({ value: 256 })
  name = "";

  @maxLength({ value: 256 })
  description = "";

  @prop()
  userCount: number = 0;

  @prop()
  rolesGrantedCount: number = 0;

  @prop()
  rolesRevokedCount: number = 0;

  @prop()
  isDefault: boolean = false;

  @prop()
  userList: number[] = [];

  @prop()
  roleList: string[] = [];

  @prop()
  allRolesList: RoleModel[] = [];

  users: ApplicationIdentityUserInterface[] = [];
}

export interface GroupInterface extends AuditEntityInterface {
  // item
  id: string; // Guid
  name: string;
  description: string;

  // model
  userCount: number;
  rolesGrantedCount: number;
  rolesRevokedCount: number;
  isDefault: boolean;
  userList: number[];
  roleList: string[]; // Guid[]
  allRolesList: RoleModel[];

  users: ApplicationIdentityUserInterface[];
}
