export interface StudentInformation {
  studentId?: number;
  notes?: string;
  accomodations?: string;
  hasAccomodations?: boolean;

  // guardian contact information
  guardianName?: string;
  preferredWayToContactGuardian?: number | string;
  bestTimeToReachGuardian?: number | string;
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

  // student contact information
  homeAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  notesAboutMe?: string;
  preferredWayToContactStudent?: number | string;
  bestTimeToReachStudent?: number | string;
  studentEmailAddress?: string;
  studentPhoneNumber?: string;
  studentBirthday: Date;
}
