export interface ReFuelEligibility {
  studentId: number;
  reservationDate: Date;
  allRequirementsMet: boolean;
  canClaimOpenSpot: boolean;
  canClaimStandbyPosition: boolean;
  gradeRequirementMet: boolean;
  liveLessonRequirementMet: boolean;
  passingClassesRequirementMet: boolean;
  reservationRejectedRequirementMet: boolean;
  breakfastOffered: boolean;
  lunchOffered: boolean;
  generalInquiry: string;
  breakfastInquiry: string;
  lunchInquiry: string;
}
