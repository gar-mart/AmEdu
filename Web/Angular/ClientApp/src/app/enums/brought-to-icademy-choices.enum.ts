export enum BroughtToAmEduChoices {
  MedicalReasons = 1,
  MentalHealthReasons = 2,
  AbilityToWorkAheadAbove = 4,
  DualEnrollment = 8,
  PlanToTravelWhileDoingSchool = 16,
  FlexibleSchedule = 32,
  PreferenceForOnlineLearning = 64,
  SmallSchoolExperience = 128,
  Other = 256,
}

export const broughtToAmEduChoicesOptions = [
  { value: BroughtToAmEduChoices.MedicalReasons, label: "Medical Reasons" },
  { value: BroughtToAmEduChoices.MentalHealthReasons, label: "Mental Health Reasons" },
  { value: BroughtToAmEduChoices.AbilityToWorkAheadAbove, label: "Ability to Work Ahead/Above" },
  { value: BroughtToAmEduChoices.DualEnrollment, label: "Dual Enrollment" },
  { value: BroughtToAmEduChoices.PlanToTravelWhileDoingSchool, label: "Plan to Travel While Doing School" },
  { value: BroughtToAmEduChoices.FlexibleSchedule, label: "Flexible Schedule" },
  { value: BroughtToAmEduChoices.PreferenceForOnlineLearning, label: "Preference for Online Learning" },
  { value: BroughtToAmEduChoices.SmallSchoolExperience, label: "Small School Experience" },
  { value: BroughtToAmEduChoices.Other, label: "Other" },
];
