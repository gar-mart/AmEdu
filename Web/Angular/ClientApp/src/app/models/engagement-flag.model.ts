import { InterventionLevel } from "app/enums/intervention-level.enum";

export interface EngagementFlag {
  id?: number;
  userId?: number;
  weekOfDate?: Date;
  actualCommunications?: number;
  targetCommunications?: number;
  actualLiveLessons?: number;
  targetLiveLessons?: number;
  actualCourseHours?: number;
  targetCourseHours?: number;
  studentName?: string;
  mentorName?: string;
  mentorEmail?: string;
  approvedStatus?: boolean | null;
  rejectedReason?: string | null;
  interventionReason?: string | null;
  staffId?: number | null;
  staffName?: string | null;
  interventionLevel?: InterventionLevel;
}
