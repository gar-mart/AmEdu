import { CommunicationType } from "../enums";

export interface Communication {
  id?: number;
  staffId?: number;
  userId?: number;
  type?: CommunicationType;
  name?: string; // refers to the staff member's name
  date?: Date;
  notes?: string;
  wasSuccessful?: boolean;
  time?: string;
  awardPoint?: boolean;
}
