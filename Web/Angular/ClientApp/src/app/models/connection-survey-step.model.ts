export interface ConnectionSurveyStep {
  userId?: number;
  guardianName?: string;
  guardianEmailAddress?: string;
  guardianPhoneNumber?: string; // (xxx) xxx-xxxx
  guardianRelationship?: string;
  studentPhoneNumber?: string; // 6-12 grade
  studentEmailAddress?: string; // 6-12 grade
  studentBirthday?: Date;
  secondaryGuardianName?: string;
  secondaryGuardianEmailAddress?: string;
  secondaryGuardianPhoneNumber?: string;
  secondaryGuardianRelationship?: string;
  interests?: string;
  extraCurricularActivities?: string;
  homeAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  notesAboutMe?: string;
  broughtToAmEduOther?: string;
  broughtToAmEduChoices?: number; // this is a bit-wise created value. 1 = Medical Reasons, 2 = Ability to work ahead/above grade level, 4 = Dual Enrollment, 8 = Plan to travel while doing school, 16 = Flexible Schedule, 32 = Preference for Online Learning, 64 = Small School Experience, 128 = Other
  wayToContactAsGuardian?: number;
  bestTimeToReachAsGuardian?: number; // 1 - Morning  2 - Afternoon  3 - Evening
  wayToReachAsStudent?: number; // 1 - Email  2 - Phone  3 - Text
  guardianIsSubscribedToWeeklySnapshotEmail?: boolean;
  isConfirmed?: boolean;
}
