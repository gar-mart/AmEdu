import { InterventionScheduledMeetingStatus } from "app/enums/intervention-scheduled-meeting-status.enum";
import { InterventionTask } from "./intervention-task.model";

export interface InterventionScheduledMeeting extends InterventionTask {
  dateOfMeeting: Date | string;
  status: InterventionScheduledMeetingStatus;
}
