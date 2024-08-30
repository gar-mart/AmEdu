import { Component, HostListener, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EngagementFlag } from "app/models";

@Component({
  selector: "app-engagement-dialog",
  templateUrl: "./engagement-dialog.component.html",
  styleUrls: ["./engagement-dialog.component.scss"],
})
export class EngagementDialogComponent {
  readonly columns: (keyof EngagementFlag)[] = [
    "weekOfDate",
    "actualCommunications",
    "actualLiveLessons",
    "actualCourseHours",
  ];

  constructor(
    private dialogRef: MatDialogRef<EngagementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public engagementFlags: EngagementFlag[]
  ) {}

  getBeginningOfWeek(endDate: Date) {
    const beginningOfWeek = new Date(endDate);
    beginningOfWeek.setDate(beginningOfWeek.getDate() - 7);
    return beginningOfWeek;
  }

  @HostListener("window:keydown", ["$event"])
  keyDown(e) {
    const enterKeyCode = 13;
    if (e.keyCode === enterKeyCode) {
      this.dialogRef.close();
      e.preventDefault();
    }
  }
}
