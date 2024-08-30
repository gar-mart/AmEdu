import { InterventionTask } from "./intervention-task.model";

export interface InterventionSuccessPlan extends InterventionTask {
  successPlanNotCreated: boolean;
  successPlanCreatedDate: Date | string;
}
