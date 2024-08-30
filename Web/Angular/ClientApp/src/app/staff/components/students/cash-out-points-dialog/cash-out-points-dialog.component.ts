import { Component, HostListener, Inject, ViewChild } from "@angular/core";
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppComponent } from "app/app.component";
import { PointsType } from "app/enums";
import { Points, StudentSearchInformation } from "app/models";
import { StaffService } from "../../../services";

@Component({
  selector: "app-cash-out-points-dialog",
  templateUrl: "./cash-out-points-dialog.component.html",
  styleUrls: ["./cash-out-points-dialog.component.scss"],
})
export class CashOutPointsDialogComponent {
  @ViewChild("formDirective") private formDirective: NgForm;
  form: UntypedFormGroup;

  studentInformation: StudentSearchInformation;
  saving = false;
  showConfirm = false;

  constructor(
    private appComponent: AppComponent,
    private staffService: StaffService,
    formBuilder: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CashOutPointsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: StudentSearchInformation
  ) {
    if (!data || !data.id) {
      throw "Cash Out Points Dialog Expects Student Data";
    }

    this.studentInformation = data;

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    this.form = formBuilder.group({
      userId: [data.id],
      type: [PointsType.Spend],
      value: [0, [Validators.min(1), Validators.required]],
    });
  }

  confirm(): void {
    if (this.saving) {
      return;
    }

    if (this.form.valid) {
      this.saving = true;

      const newItem: Points = Object.assign({}, this.form.value);
      newItem.value = -newItem.value;

      if (newItem.value + this.studentInformation.pointBalance < 0 && !this.showConfirm) {
        this.showConfirm = true;
        return;
      }

      this.showConfirm = false;
      this.appComponent.isBusy = true;

      this.staffService.createPoints(newItem).subscribe(result => {
        if (result) {
          this.dialogRef.close(newItem.value);
        } else {
          this.snackBar.open("Failed to record points", "Close", { panelClass: "success", duration: 3500 });
          this.appComponent.isBusy = false;
        }
      });
    }
  }

  cancel(): void {
    if (this.showConfirm) {
      this.showConfirm = false;
      this.saving = false;
    } else {
      this.dialogRef.close(false);
    }
  }

  confirmNegativePoints() {
    this.saving = false;
    this.confirm();
  }

  @HostListener("window:keydown", ["$event"])
  keyDown(e) {
    const enterKeyCode = 13;
    if (e.keyCode === enterKeyCode && !this.showConfirm) {
      this.confirm();
      e.preventDefault();
    }
  }
}
