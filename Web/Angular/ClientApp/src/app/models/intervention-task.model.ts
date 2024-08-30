import { Attachment } from "./attachment.model";

export interface InterventionTask {
  completedByUserId: number;
  completedByUserName: string;
  completedDate: Date | string;
  interventionId: number;
  isCompleted: boolean;
  attachments: Attachment[];
}
