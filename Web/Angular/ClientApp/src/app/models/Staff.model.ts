export interface Staff {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  isMentor: boolean;
  isInterventionist?: boolean;
  isTeacher?: boolean;
  isReFuelCoordinator?: boolean;
  menteeCount?: number;
  introVideoId?: string;
  appointmentLink?: string;
  mentorGrades?: string[];
  counselorGrades?: string[];
}
