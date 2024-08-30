import { Tardy } from "app/enums";

export interface Tardiness {
  userId?: number;
  classId?: number;
  staffId?: number;
  date?: Date;
  type?: Tardy | null;
  comment?: string;

  // display only
  userName?: string;
  className?: string;
  staffName?: string;
}
