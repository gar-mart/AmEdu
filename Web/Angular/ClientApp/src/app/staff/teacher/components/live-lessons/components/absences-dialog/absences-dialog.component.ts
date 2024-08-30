import { Component, Inject } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Absence } from "../../../../../../models/absence";

@Component({
  selector: "app-absences-dialog",
  templateUrl: "./absences-dialog.component.html",
  styleUrls: ["./absences-dialog.component.scss"],
})
export class AbsencesDialogComponent {
  form: UntypedFormGroup;
  title: string;
  absence: Absence;
  minDate = new Date("2020-1-1");
  constructor(
    private dialogRef: MatDialogRef<AbsencesDialogComponent>,
    formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) data: { studentName: string; absence: Absence }
  ) {
    this.title = `Edit Excused Absences for ${data.studentName}`;
    this.absence = data.absence;
    this.form = formBuilder.group({
      startDate: [data.absence.startDate, Validators.required],
      endDate: [data.absence.endDate, Validators.required],
      reason: [data.absence.reason, [Validators.maxLength(500), Validators.required]],
    });
  }

  delete(): void {
    this.absence.reason = null;
    this.dialogRef.close(this.absence);
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }
    this.absence.startDate = this.form.controls["startDate"].value;
    this.absence.endDate = this.form.controls["endDate"].value;
    this.absence.reason = this.form.controls["reason"].value;
    this.dialogRef.close(this.absence);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
