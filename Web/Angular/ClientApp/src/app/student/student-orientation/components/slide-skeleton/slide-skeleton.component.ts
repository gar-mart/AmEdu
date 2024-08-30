import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-slide",
  templateUrl: "./slide-skeleton.component.html",
  styleUrls: ["./slide-skeleton.component.scss"],
})
export class SlideSkeletonComponent {
  @Input() stepName: string;
  @Input() saveShown: boolean;
  @Input() saveDisabled: boolean;
  @Output() onSave = new EventEmitter();

  save() {
    this.onSave.emit();
  }
}
