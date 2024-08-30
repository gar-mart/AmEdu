import { Component, Inject } from "@angular/core";
import { UntypedFormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { StudentSearchInformation } from "@models/student-search-information.model";
import { StaffService } from "app/staff/services";
import { finalize } from "rxjs/operators";

@Component({
  templateUrl: "./generate-intervention-dialog.component.html",
  styleUrls: ["./generate-intervention-dialog.component.scss"],
})
export class GenerateInterventionDialogComponent {
  reason = new UntypedFormControl("", [Validators.required, Validators.maxLength(500)]);
  saving = false;

  constructor(
    private dialogRef: MatDialogRef<GenerateInterventionDialogComponent>,
    private staffService: StaffService,
    @Inject(MAT_DIALOG_DATA) public student: StudentSearchInformation
  ) {}

  confirm(): void {
    this.reason.markAsTouched();

    if (this.reason.valid) {
      this.saving = true;

      this.staffService
        .generateIntervention({ reason: this.reason.value, studentId: this.student.id })
        .pipe(finalize(() => (this.saving = false)))
        .subscribe(result => {
          this.dialogRef.close(result);
        });
    }
  }
}
