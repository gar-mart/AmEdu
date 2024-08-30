import { Component, ElementRef, HostListener, Inject, ViewChild } from "@angular/core";
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Student } from "@models/student.model";
import { AppComponent } from "../../../../app.component";
import { Absence } from "../../../../models/absence";
import { TeacherService } from "../../../teacher";

@Component({
  selector: "app-absence-dialog",
  templateUrl: "./absence-dialog.component.html",
  styleUrls: ["./absence-dialog.component.scss"],
})
export class AbsenceDialogComponent {
  @ViewChild("formDirective") private formDirective: NgForm;
  @ViewChild("reason") private reason: ElementRef<HTMLInputElement>;
  absenceForm: UntypedFormGroup;

  minDate = new Date("2020-1-1");

  saving = false;

  constructor(
    private appComponent: AppComponent,
    private teacherService: TeacherService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AbsenceDialogComponent>,
    formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) data: { student: Student; absence: Absence }
  ) {
    if (!data || !data.student) {
      throw "Absence Dialog Expects Student Data";
    }

    if (!data.absence) {
      // create absence
      const now = new Date();
      data.absence = {
        startDate: now,
        endDate: now,
        reason: "",
      };
    }

    this.absenceForm = formBuilder.group({
      id: data.absence.id ?? 0,
      userId: [data.student.id],
      startDate: [data.absence.startDate, Validators.required],
      endDate: [data.absence.endDate, Validators.required],
      reason: [data.absence.reason, Validators.required],
    });
  }

  confirm(): void {
    if (this.saving || this.absenceForm.invalid) {
      return;
    }

    this.saving = true;
    this.appComponent.isBusy = true;

    const item: Absence = Object.assign({}, this.absenceForm.value);

    this.teacherService.updateAbsence(item).subscribe(
      result => {
        if (!result) {
          this.saving = false;
          this.appComponent.isBusy = false;
          this.snackBar.open("Failed to update absence entry", "Close", { panelClass: "success", duration: 3500 });
        } else {
          this.formDirective.resetForm();
          this.saving = false;
          this.appComponent.isBusy = false;
          this.dialogRef.close(item);
        }
      },
      err => {
        this.saving = false;
        this.appComponent.isBusy = false;
        if (err.error && err.error.startsWith("System.Data.SqlClient.SqlException")) {
          this.snackBar.open(err.error.split("\n")[0], "Close", { panelClass: "error", duration: 3500 });
        }
      }
    );
  }

  cancel(): void {
    this.dialogRef.close();
  }

  @HostListener("window:keydown", ["$event"])
  keyDown(e) {
    if (e.key === "Enter") {
      this.confirm();
      e.preventDefault();
    }
  }
}
