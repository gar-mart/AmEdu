import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { Step } from "@models/step.model";
import { StepStatus } from "app/enums/step-status.enum";

@Pipe({
  name: "slideStatus",
})
export class SlideStatusPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(step: Step): string {
    switch (step.status) {
      case StepStatus.Upcoming:
        return `Upcoming: ${this.datePipe.transform(step.activateDate, "shortDate")}`;
      default:
        return StepStatus[step.status];
    }
  }
}
