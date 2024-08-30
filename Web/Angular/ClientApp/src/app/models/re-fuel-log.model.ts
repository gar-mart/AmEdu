import { AuditEntity } from "./audit-entity.model";

export interface ReFuelLog extends AuditEntity {
  id?: number;
  studentId?: number;
  checkedIn?: Date;
  checkedOut?: Date | null;

  // client-side properties
  automaticallySet?: boolean;
}
