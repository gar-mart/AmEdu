import { Component, HostListener, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PointsType } from "app/enums";
import { Student } from "app/models";
import { PointDetailDialogComponent } from "./components/point-detail-dialog/point-detail-dialog.component";

@Component({
  templateUrl: "./point-breakdown-dialog.component.html",
  styleUrls: ["./point-breakdown-dialog.component.scss"],
})
export class PointBreakdownDialogComponent {
  student: Student;
  PointsType = PointsType;

  constructor(
    private dialogRef: MatDialogRef<PointBreakdownDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: Student
  ) {
    this.student = data;
  }

  openPointDetail(pointsType: PointsType) {
    this.dialog.open(PointDetailDialogComponent, {
      minWidth: "500px",
      autoFocus: false,
      panelClass: ["rounded-dialog-window"],
      data: { student: this.student, pointsType },
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  @HostListener("window:keydown", ["$event"])
  keyDown(e) {
    const enterKeyCode = 13;
    if (e.keyCode === enterKeyCode) {
      this.cancel();
      e.preventDefault();
    }
  }
}
