import { InterventionLevel } from "../enums/intervention-level.enum";
import { InterventionStatus } from "../enums/intervention-status.enum";

export interface FlaggedStudentReportItem {
  studentName: string;
  studentEmail: string;
  gradeLevel: string;
  weekOfDate: string;
  mentorName: string;
  level: InterventionLevel;
  status: InterventionStatus;
}
