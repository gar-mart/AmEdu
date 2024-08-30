import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { EngagementFlag } from "app/models";

@Component({
  selector: "app-engagement-flag-notification-dialog-dialog",
  templateUrl: "./engagement-flag-notification-dialog.component.html",
  styleUrls: ["./engagement-flag-notification-dialog.component.scss"],
})
export class EngagementFlagNotificationDialogComponent implements OnInit {
  engagementFlagNotifications: EngagementFlag[];

  displayedColumns: string[] = [
    "weekOfDate",
    "studentName",
    "actualCommunications",
    "actualLiveLessons",
    "actualCourseHours",
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialogRef: MatDialogRef<EngagementFlagNotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: EngagementFlag[]
  ) {
    if (!data) {
      throw "Engagement Flag Notification Dialog Expects Student Data";
    }

    this.engagementFlagNotifications = data;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.engagementFlagNotifications);
    this.dataSource.sort = this.sort;
  }

  getBeginningOfWeek(endDate: Date) {
    const beginningOfWeek = new Date(endDate);
    beginningOfWeek.setDate(beginningOfWeek.getDate() - 7);
    return beginningOfWeek;
  }

  close(): void {
    this.dialogRef.close();
  }
}
