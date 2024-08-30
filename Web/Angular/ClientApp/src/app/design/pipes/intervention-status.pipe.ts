import { Pipe, PipeTransform } from "@angular/core";
import { InterventionStatus } from "app/enums/intervention-status.enum";

@Pipe({
  name: "interventionStatus",
})
export class InterventionStatusPipe implements PipeTransform {
  transform(status: InterventionStatus): string {
    switch (status) {
      case InterventionStatus.Completed:
        return "Completed";

      case InterventionStatus.InProgress:
        return "In Progress";

      case InterventionStatus.NotCompleted:
        return "Not Completed";

      case InterventionStatus.Voided:
        return "Voided";
    }
  }
}
