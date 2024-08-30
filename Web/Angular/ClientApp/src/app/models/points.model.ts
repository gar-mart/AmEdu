import { PointsType } from "app/enums";
import { PagePointSource } from "app/enums/page-point-source.enum";
import { UserPointSource } from "app/enums/user-point-source.enum";

export interface Points {
  userId?: number; // studentId
  staffId?: number;
  staffName?: string;
  date?: Date;
  value?: number;
  type?: PointsType;
  id?: number;
  comments?: string;
  pageSource?: PagePointSource;
  userSource?: UserPointSource;
}
