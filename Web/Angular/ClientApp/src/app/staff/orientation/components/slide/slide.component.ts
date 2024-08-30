import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmationDialogComponent } from "@design/confirmation-dialog/confirmation-dialog.component";
import { StepContentModel, SystemContentModel } from "@models/step-content.model";
import { Step } from "@models/step.model";
import { OrientationService } from "@services/orientation.service";
import { AppComponent } from "app/app.component";
import { SystemContentComponentIds } from "app/enums/system-content-component-id.enum";
import { Constants } from "app/shared";
import { Subscription } from "rxjs";
import { SlideService } from "../slide.service";
import { SlideContentComponent } from "./slide-content.component";
import { SlideDetailsComponent } from "./slide-details.component";

@Component({
  selector: "app-slide",
  templateUrl: "./slide.component.html",
  styleUrls: ["./slide.component.scss"],
})
export class SlideComponent implements OnChanges, OnDestroy {
  @Input() step: Step;
  @Input() selectedTabIndex: number;
  @Output() stepUpdated = new EventEmitter<{ step: Step; deleted: boolean }>();
  @Output() selectedTabChange = new EventEmitter<number>();
  @Output() duplicateStep = new EventEmitter<Step>();
  @Output() isEditingChange = new EventEmitter<boolean>();

  @ViewChild(SlideDetailsComponent) slideDetails: SlideDetailsComponent;
  @ViewChild(SlideContentComponent) slideContent: SlideContentComponent;

  SystemContentComponentIds = SystemContentComponentIds;
  SystemContentModel = SystemContentModel;

  isEditing = false;
  disableControls = false;
  formGroup: UntypedFormGroup;

  subscriptions: Subscription[] = [];

  constructor(
    private orientationService: OrientationService,
    private appComponent: AppComponent,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: UntypedFormBuilder,
    private slideService: SlideService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.step?.previousValue?.id !== changes.step?.currentValue?.id) {
      this.isEditing = false;

      this.formGroup = this.formBuilder.group({
        name: new UntypedFormControl(this.step.name, {
          initialValueIsDefault: true,
          validators: [Validators.required, Validators.maxLength(150)],
        }),
      });

      setTimeout(() => (this.appComponent.isBusy = true));
      this.slideService
        .setContent(this.step)
        .subscribe()
        .add(() => setTimeout(() => (this.appComponent.isBusy = false)));

      this.subscriptions.forEach(s => s.unsubscribe());
      this.subscriptions = [this.formGroup.valueChanges.subscribe(() => this.onContentEdit())];
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getEditedStep(): Step {
    return Object.assign({}, this.step, this.slideDetails?.formGroup?.value, this.formGroup?.value);
  }

  onContentEdit() {
    this.isEditing = true;
    this.isEditingChange.emit(this.isEditing);
  }

  selectedTabIndexChange(event: number) {
    history.replaceState(null, null, `${Constants.manageOrientationPath}/${this.step.id}/${event}`);
    this.selectedTabChange.emit(event);
    this.selectedTabIndex = event;
  }

  delete() {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: {
          confirmationMessage: "Are you sure you want to delete this slide? This cannot be undone.",
        },
      })
      .beforeClosed()
      .subscribe(confirmationResult => {
        if (confirmationResult) {
          this.disableControls = true;
          const step = this.step;
          this.appComponent.isBusy = true;
          this.orientationService
            .deleteStep(step)
            .subscribe(() => {
              this.stepUpdated.emit({ step: step, deleted: true });
            })
            .add(() => {
              this.appComponent.isBusy = false;
              this.disableControls = false;
            });
        }
      });
  }

  duplicate() {
    this.duplicateStep.emit(this.step);
  }

  discardChanges() {
    this.formGroup.reset();
    this.slideDetails.formGroup.reset();

    this.appComponent.isBusy = true;
    this.slideService
      .setContent(this.step, true)
      .subscribe(() => {
        this.isEditing = false;
        this.isEditingChange.emit(this.isEditing);
      })
      .add(() => (this.appComponent.isBusy = false));
  }

  save() {
    const step = this.getEditedStep();

    step.content = new StepContentModel({ content: step.content?.content || [] });

    this.disableControls = true;
    this.appComponent.isBusy = true;
    this.orientationService
      .updateStep(step)
      .subscribe(
        result => {
          if (result) {
            this.stepUpdated.emit({ step: step, deleted: false });
          }

          this.isEditing = false;
          this.isEditingChange.emit(this.isEditing);
        },
        error => {
          let errorMessage: string;
          if (typeof error === "string") {
            errorMessage = error;
          } else {
            errorMessage = error?.error || error?.message || "Save failed.";
          }

          this.snackBar.open(errorMessage, "Dismiss", { duration: 10000 });
        }
      )
      .add(() => (this.disableControls = this.appComponent.isBusy = false));
  }
}
