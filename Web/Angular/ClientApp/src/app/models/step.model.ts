import { StepStatus } from "../enums/step-status.enum";
import { StepContent } from "./step-content.model";

export class Step {
  id: number;
  name: string;
  contentFileName: string;
  orderBy: number;
  activateDate: Date | null;
  expirationDate: Date | null;
  isActive: boolean;
  status: StepStatus;

  gradeLevels: string[];
  content: StepContent;
}
