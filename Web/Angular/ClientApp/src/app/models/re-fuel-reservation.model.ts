import { ReFuelReservationRejectReason, ReFuelReservationType } from "../enums";
import { AuditEntity } from "./audit-entity.model";
import { Student } from "./student.model";

export interface ReFuelReservation extends AuditEntity {
  studentId?: number;
  date?: Date;
  rejectReasonType?: ReFuelReservationRejectReason | null;
  rejectReasonComment?: string | null;
  standbyPosition?: number | null;
  student?: Student;
  lastCheckIn?: Date;
  lastCheckOut?: Date;
  type?: ReFuelReservationType;
  generalInquiryResponse?: string;
  breakfastInquiryResponse?: string;
  lunchInquiryResponse?: string;
}
