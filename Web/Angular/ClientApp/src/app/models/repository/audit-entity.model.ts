import { prop } from "@rxweb/reactive-form-validators";

export abstract class AuditEntityModel implements AuditEntityInterface {
  @prop()
  createdDate: Date;

  @prop()
  createdOrUpdatedDate: Date;

  @prop()
  createdOrUpdatedUserId: number;

  @prop()
  createdOrUpdatedUserName: string;

  @prop()
  createdUserId: number;

  @prop()
  createdUserInitials: string;

  @prop()
  createdUserName: string;

  @prop()
  updatedDate: Date;

  @prop()
  updatedUserId: number;

  @prop()
  updatedUserInitials: string;

  @prop()
  updatedUserName: string;
}

export interface AuditEntityInterface {
  createdDate: Date;
  createdOrUpdatedDate: Date;
  createdOrUpdatedUserId: number;
  createdOrUpdatedUserName: string;
  createdUserId: number;
  createdUserInitials: string;
  createdUserName: string;
  updatedDate: Date;
  updatedUserId: number;
  updatedUserInitials: string;
  updatedUserName: string;
}
