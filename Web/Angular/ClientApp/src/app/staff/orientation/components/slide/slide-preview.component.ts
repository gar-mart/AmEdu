import { Component, Input } from "@angular/core";
import { Step } from "@models/step.model";
import { SlideService } from "../slide.service";

@Component({
  selector: "app-slide-preview",
  templateUrl: "./slide-preview.component.html",
  styleUrls: ["./slide-preview.component.scss"],
})
export class SlidePreviewComponent {
  @Input() step: Step;

  constructor(public slideService: SlideService) {}
}
