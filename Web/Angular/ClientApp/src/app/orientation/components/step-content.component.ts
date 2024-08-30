import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  ContactContentModel,
  Content,
  QuizContentModel,
  ShortcutContentModel,
  SignatureContentModel,
  StudentResourceContentModel,
  SystemContentModel,
  TextImageContentModel,
  YouTubeVideoContentModel,
} from "@models/step-content.model";
import { Step } from "@models/step.model";
import { StepsByStudent } from "@models/steps-by-student.model";

@Component({
  selector: "app-step-content",
  templateUrl: "./step-content.component.html",
  styleUrls: ["./step-content.component.scss"],
})
export class StepContentComponent implements OnInit {
  @Input() content: Content;
  @Input() editMode = false;
  @Input() updateMode = false; // if the student wants to edit a completed slide, this will be true
  @Input() previewMode = false;
  @Input() step: StepsByStudent = null; // not provided in preview mode or edit mode
  @Input() masterStep: Step = null; // not provided in live orientation
  @Output() edit = new EventEmitter<void>();

  YouTubeVideoContentModel = YouTubeVideoContentModel;
  ShortcutContentModel = ShortcutContentModel;
  SystemContentModel = SystemContentModel;
  StudentResourceContentModel = StudentResourceContentModel;
  TextImageContentModel = TextImageContentModel;
  SignatureContentModel = SignatureContentModel;
  ContactContentModel = ContactContentModel;
  QuizContentModel = QuizContentModel;

  ngOnInit(): void {
    if ((this.editMode || this.previewMode) && this.step) {
      throw new Error("Preview/Edit Mode cannot be provided alongside a Step.");
    }
    if (!(this.editMode || this.previewMode) && this.masterStep) {
      throw new Error("Live orientation cannot provide a master Step.");
    }
  }
}
