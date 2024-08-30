import { InterventionTask } from "./intervention-task.model";

export interface InterventionTruancyForm extends InterventionTask {
  markedCompleted: boolean;
}
