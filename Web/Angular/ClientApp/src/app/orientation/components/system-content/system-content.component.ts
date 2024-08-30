import { Component, Input } from "@angular/core";
import { SystemContent } from "@models/step-content.model";
import { Step } from "@models/step.model";
import { StepsByStudent } from "@models/steps-by-student.model";
import { SystemContentComponentIds } from "app/enums/system-content-component-id.enum";

@Component({
  selector: "app-system-content",
  templateUrl: "./system-content.component.html",
  styleUrls: ["./system-content.component.scss"],
})
export class SystemContentComponent {
  @Input("content") contentType: SystemContent;
  @Input() editMode: boolean;
  @Input() previewMode: boolean;
  @Input() updateMode: boolean;
  @Input() step: StepsByStudent; // not provided in preview mode or edit mode
  @Input() masterStep: Step; // not provided in live orientation

  SystemContentComponentIds = SystemContentComponentIds;
}
