import { prop } from "@rxweb/reactive-form-validators";
import { AuditEntityInterface, AuditEntityModel } from "./audit-entity.model";

export class BaseModel extends AuditEntityModel implements BaseModelInterface {
  @prop()
  id: number = 0;
}

export interface BaseModelInterface extends AuditEntityInterface {
  id: number;
}
