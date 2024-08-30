import { InterventionLevel } from "app/enums/intervention-level.enum";
import { InterventionStatus } from "app/enums/intervention-status.enum";
import { Student } from "./student.model";

export interface StudentSearchInformation extends Student {
  firstName?: string;
  lastName?: string;
  isMyStudent?: boolean;
  mediaReleaseParticipation?: string;
  refuelParticipation?: string;
  hand2HandParticipation?: string;
  cumulativePoints?: number;
  pointBalance?: number;
  stewardshipPoints?: number;
  integrityPoints?: number;
  respectPoints?: number;
  engagementPoints?: number;
  communicationPoints?: number;
  liveLessonPoints?: number;
  missedLastWeeksRequirements?: boolean;
  notes?: string;
  enrollmentDate?: Date;
  unenrollmentDate?: Date;
  accomodations?: string;
  hasAccomodations?: boolean;

  // guardian contact information
  guardianName?: string;
  preferredWayToContactGuardian?: string;
  bestTimeToReachGuardian?: string;
  guardianEmailAddress?: string;
  guardianPhoneNumber?: string;
  guardianIsSubscribedToWeeklySnapshotEmail?: boolean;
  guardianRelationship?: string;

  // secondary guardian contact information
  secondaryGuardianName?: string;
  secondaryGuardianEmailAddress?: string;
  secondaryGuardianPhoneNumber?: string;
  secondaryGuardianRelationship?: string;
  secondaryGuardianIsSubscribedToWeeklySnapshotEmail?: boolean;

  //student contact information
  preferredWayToContactStudent?: string;
  bestTimeToReachStudent?: string;
  homeAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  notesAboutMe?: string;
  studentPersonalEmailAddress?: string;
  studentPhoneNumber?: string;
  studentBirthday?: Date;

  interventionLevel?: InterventionLevel;
  interventionStatus?: InterventionStatus;
}
