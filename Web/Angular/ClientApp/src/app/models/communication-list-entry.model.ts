export interface CommunicationListEntry {
  // from item
  communicationListId?: number;
  userId: number;
  includeStudent?: boolean;
  includeGuardian1?: boolean;
  includeGuardian2?: boolean;
  includeMentor?: boolean;
  includeStaff?: boolean;
  staffId?: number;

  // from model
  userName: string;
  userEmailAddress: string;
  guardianName?: string;
  guardianEmailAddress?: string;
  secondaryGuardianName?: string;
  secondaryGuardianEmailAddress?: string;
  mentorName?: string;
  mentorEmail?: string;
  gradeLevel?: string;

  // client-side only
  included: boolean;
  includeSelected?: boolean;
  removeSelected?: boolean;
  additionalRecipientEmailAddress: string;

  isStaff: boolean;
}
