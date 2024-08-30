import { Component, HostListener, Inject, OnDestroy, ViewChild } from "@angular/core";
import { AbstractControl, NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AdminService } from "@services/admin.service";
import { Subscription } from "rxjs";
import { AppComponent } from "../../../../../app.component";
import { InterventionThreshold } from "../../../../../models";

type InterventionThresholdForm = InterventionThreshold & {
  requireOnlineCourseHours: boolean;
  requireCommunicationLogs: boolean;
  requireLiveLessons: boolean;
};

@Component({
  selector: "app-intervention-threshold-dialog",
  templateUrl: "./intervention-threshold-dialog.component.html",
  styleUrls: ["./intervention-threshold-dialog.component.scss"],
})
export class InterventionThresholdDialogComponent implements OnDestroy {
  @ViewChild("formDirective") private formDirective: NgForm;

  // this flag is used to avoid an infinite loop of value changes
  private isUpdatingNumberOfCriteriaValidators = false;

  form: UntypedFormGroup;
  title: string;
  saving = false;

  subscriptions: Subscription[] = [];

  constructor(
    private appComponent: AppComponent,
    private adminService: AdminService,
    formBuilder: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<InterventionThresholdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public interventionThreshold: InterventionThreshold
  ) {
    if (!interventionThreshold?.id) {
      throw "Intervention Threshold Dialog Expects Data";
    }

    this.title =
      interventionThreshold.grade === "K"
        ? "Kindergarten Intervention Threshold"
        : interventionThreshold.grade === "1"
        ? "1st Grade Intervention Threshold"
        : interventionThreshold.grade === "2"
        ? "2nd Grade Intervention Threshold"
        : interventionThreshold.grade === "3"
        ? "3rd Grade Intervention Threshold"
        : interventionThreshold.grade + "th Grade Intervention Threshold";

    this.form = formBuilder.group({
      id: [interventionThreshold.id],
      grade: [interventionThreshold.grade],
      numberOfRequirements: [interventionThreshold.numberOfRequirements, [Validators.required, Validators.min(0)]],
      minimumCommunicationLogs: [interventionThreshold.minimumCommunicationLogs, [Validators.min(0)]],
      minimumCourseHoursSpent: [interventionThreshold.minimumCourseHoursSpent, [Validators.min(0)]],
      minimumLiveLessons: [interventionThreshold.minimumLiveLessons, [Validators.min(0)]],
      expectedCommunicationLogs: [
        interventionThreshold.expectedCommunicationLogs,
        [Validators.required, Validators.min(interventionThreshold.minimumCommunicationLogs)],
      ],
      expectedLiveLessons: [
        interventionThreshold.expectedLiveLessons,
        [Validators.required, Validators.min(interventionThreshold.minimumLiveLessons)],
      ],
      // these are client-side only values
      requireOnlineCourseHours: [false],
      requireCommunicationLogs: [false],
      requireLiveLessons: [false],
    });

    this.subscriptions.push(
      this.form
        .get("minimumCommunicationLogs")
        .valueChanges.subscribe(value => this.setMinMaxValidator(value, this.form.get("expectedCommunicationLogs"))),
      this.form
        .get("minimumLiveLessons")
        .valueChanges.subscribe(value => this.setMinMaxValidator(value, this.form.get("expectedLiveLessons"))),
      this.form
        .get("requireOnlineCourseHours")
        .valueChanges.subscribe(value => this.setRequiredValidator(value, this.form.get("minimumCourseHoursSpent"))),
      this.form
        .get("requireCommunicationLogs")
        .valueChanges.subscribe(value => this.setRequiredValidator(value, this.form.get("minimumCommunicationLogs"))),
      this.form
        .get("requireLiveLessons")
        .valueChanges.subscribe(value => this.setRequiredValidator(value, this.form.get("minimumLiveLessons"))),
      this.form.valueChanges.subscribe(value => this.setMaxRequirementsValidator(value))
    );

    // set these after form is initialized so that the required validators are set without duplicate code.
    this.form.get("requireOnlineCourseHours").setValue(interventionThreshold.minimumCourseHoursSpent !== null);
    this.form.get("requireCommunicationLogs").setValue(interventionThreshold.minimumCommunicationLogs !== null);
    this.form.get("requireLiveLessons").setValue(interventionThreshold.minimumLiveLessons !== null);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  confirm(): void {
    if (this.saving) {
      return;
    }

    if (this.form.valid) {
      this.saving = true;
      this.appComponent.isBusy = true;

      const item: InterventionThresholdForm = this.form.value;

      // set null any minimum fields that are not required.
      if (!item.requireCommunicationLogs) {
        item.minimumCommunicationLogs = null;
      }

      if (!item.requireOnlineCourseHours) {
        item.minimumCourseHoursSpent = null;
      }

      if (!item.requireLiveLessons) {
        item.minimumLiveLessons = null;
      }

      this.adminService.updateInterventionThreshold(item).subscribe(result => {
        if (result) {
          this.formDirective.resetForm();
          this.saving = false;
          this.appComponent.isBusy = false;
          this.dialogRef.close(true);
        } else {
          this.saving = false;
          this.appComponent.isBusy = false;
          this.snackBar.open("Failed to update intervention threshold", "Close", {
            panelClass: "success",
            duration: 3500,
          });
        }
      });
    }
  }

  cancel(): void {
    this.formDirective.resetForm();
    this.dialogRef.close(false);
  }

  @HostListener("window:keydown", ["$event"])
  keyDown(e) {
    const enterKeyCode = 13;
    if (e.keyCode === enterKeyCode) {
      this.confirm();
      e.preventDefault();
    }
  }

  private setMaxRequirementsValidator(value: InterventionThresholdForm) {
    if (!this.isUpdatingNumberOfCriteriaValidators) {
      this.isUpdatingNumberOfCriteriaValidators = true;
      const numberOfIncludedCriteria = [
        value.requireCommunicationLogs,
        value.requireLiveLessons,
        value.requireOnlineCourseHours,
      ].filter(Boolean).length;
      this.form.controls.numberOfRequirements.setValidators([
        Validators.required,
        Validators.min(0),
        Validators.max(numberOfIncludedCriteria),
      ]);
      this.form.controls.numberOfRequirements.updateValueAndValidity();
      this.isUpdatingNumberOfCriteriaValidators = false;
    }
  }

  private setRequiredValidator(isRequired: boolean, minimumControl: AbstractControl) {
    const validators = [Validators.min(0)];

    if (isRequired) {
      validators.push(Validators.required);
    }

    minimumControl.setValidators(validators);
    minimumControl.updateValueAndValidity();
  }

  private setMinMaxValidator(minValue: number, expectedControl: AbstractControl) {
    expectedControl.setValidators([Validators.required, Validators.min(minValue)]);
    expectedControl.updateValueAndValidity();
  }
}
