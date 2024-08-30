import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AvatarDialogComponent } from "@design/avatar-dialog/avatar-dialog.component";
import { CommonService } from "@services/common.service";
import { Staff, Student } from "app/models";
import { environment } from "environments/environment";

@Component({
  selector: "app-view-mentees-dialog",
  templateUrl: "./view-mentees-dialog.component.html",
  styleUrls: ["./view-mentees-dialog.component.scss"],
})
export class ViewMenteesDialogComponent implements OnInit {
  environment = environment;
  loading = true;
  staffMember: Staff;
  students: Student[] = [];

  constructor(
    private commonService: CommonService,
    private dialogRef: MatDialogRef<ViewMenteesDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.staffMember = data.staffMember;
  }

  ngOnInit() {
    this.commonService.getStudentsByMentor(this.staffMember.id).subscribe(students => {
      this.students = students;
      this.loading = false;
    });
  }

  openStudentAvatarDialog(student: Student) {
    this.dialog.open(AvatarDialogComponent, {
      autoFocus: false,
      panelClass: ["rounded-dialog-window"],
      data: {
        student: student,
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  @HostListener("window:keydown", ["$event"])
  keyDown(e) {
    const enterKeyCode = 13;
    if (e.keyCode === enterKeyCode) {
      this.close();
      e.preventDefault();
    }
  }
}
