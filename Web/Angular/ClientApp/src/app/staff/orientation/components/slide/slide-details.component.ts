import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from "@angular/core";
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { Step } from "@models/step.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-slide-details",
  templateUrl: "./slide-details.component.html",
  styleUrls: ["./slide-details.component.scss"],
})
export class SlideDetailsComponent implements OnChanges, OnDestroy {
  @Input() step: Step;
  @Output() edit = new EventEmitter<void>();

  formGroup: UntypedFormGroup;

  subscriptions: Subscription[] = [];

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.step.previousValue?.id !== changes.step.currentValue.id) {
      this.formGroup = this.formBuilder.group({
        activateDate: new UntypedFormControl(this.step.activateDate ? new Date(this.step.activateDate) : null, {
          initialValueIsDefault: true,
        }),
        expirationDate: new UntypedFormControl(this.step.expirationDate ? new Date(this.step.expirationDate) : null, {
          initialValueIsDefault: true,
        }),
        gradeLevels: new UntypedFormControl(this.step.gradeLevels, {
          initialValueIsDefault: true,
        }),
      });

      this.subscriptions.forEach(s => s.unsubscribe());
      this.subscriptions.push(this.formGroup.valueChanges.subscribe(() => this.edit.emit()));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  gradesSelected(grades) {
    this.formGroup.controls.gradeLevels.patchValue(grades);
  }
}
