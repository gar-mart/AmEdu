import { InterventionLevel } from "app/enums/intervention-level.enum";
import { InterventionStatus } from "app/enums/intervention-status.enum";
import { EngagementFlag } from "./engagement-flag.model";
import { InterventionEmailCommunication } from "./intervention-email-communication.model";
import { InterventionScheduledMeeting } from "./intervention-scheduled-meeting.model";
import { InterventionSuccessPlan } from "./intervention-success-plan.model";
import { InterventionTruancyForm } from "./intervention-truancy-form.model";

export class Intervention {
  id: number;
  engagementFlagId: number;
  completedByUserId: number;
  completedDate: Date | string;
  generatedByUserId: number;
  generatedDate: Date | string;
  level: InterventionLevel;
  logOnly: boolean;
  schoolYear: number;
  status: InterventionStatus;
  studentId: number;

  studentName: string;
  studentGradeLevel: string;
  mentorName: string;
  generatedByUserName: string;
  completedByUserName: string;
  emailExists: boolean;

  emailCommunication: InterventionEmailCommunication;
  scheduledMeeting: InterventionScheduledMeeting;
  successPlan: InterventionSuccessPlan;
  truancyForm: InterventionTruancyForm;
  engagementFlag: EngagementFlag;
}
