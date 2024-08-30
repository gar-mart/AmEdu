import { InterventionTask } from "./intervention-task.model";

export interface InterventionEmailCommunication extends InterventionTask {
  email: string;
}
