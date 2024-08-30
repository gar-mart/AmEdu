import { ConnectionSurveyStep } from "./connection-survey-step.model";

export interface StudentOrientationResponse extends ConnectionSurveyStep {
  /** same as studentId */
  id: number;
  studentId: number;
  name: string;
  gradeLevel: string;
  orientationStartTime: Date | string | null;
  studentEmail: string;
  mentorName: string;
}
