import { Component, HostListener, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Announcement } from "app/models";

@Component({
  selector: "app-announcement-dialog",
  templateUrl: "./announcement-dialog.component.html",
  styleUrls: ["./announcement-dialog.component.scss"],
})
export class AnnouncementDialogComponent {
  announcement: Announcement;

  constructor(
    private dialogRef: MatDialogRef<AnnouncementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: Announcement
  ) {
    if (!data) {
      throw "AnnouncementDialogComponent Expects Announcement";
    }

    this.announcement = data;
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
