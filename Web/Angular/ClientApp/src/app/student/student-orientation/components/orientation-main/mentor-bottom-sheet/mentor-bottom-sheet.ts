import { Component, Inject } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { EmailMentorDialogComponent } from "@student/components/dashboard/components/email-mentor-dialog/email-mentor-dialog.component";
import { Student } from "app/models";

@Component({
  selector: "app-bottom-sheet",
  templateUrl: "./mentor-bottom-sheet.html",
  styleUrls: [],
})
export class MentorBottomSheetComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Student,
    private bottomSheetRef: MatBottomSheetRef<MentorBottomSheetComponent>,
    private dialog: MatDialog
  ) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
  }

  openEmailDailog(student: Student): void {
    this.bottomSheetRef.dismiss();
    this.dialog.open(EmailMentorDialogComponent, {
      width: "450px",
      autoFocus: false,
      panelClass: ["rounded-dialog-window"],
      data: {
        student,
      },
    });
  }
}
