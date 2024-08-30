import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommonService } from "@services/common.service";
import { Student } from "app/models";

@Component({
  selector: "app-email-mentor-dialog",
  templateUrl: "./email-mentor-dialog.component.html",
  styleUrls: ["./email-mentor-dialog.component.scss"],
})
export class EmailMentorDialogComponent implements OnInit {
  form: UntypedFormGroup;
  student: Student;
  isSecondaryMentor: boolean;
  mentorName: string;

  constructor(
    private commonService: CommonService,
    private dialogRef: MatDialogRef<EmailMentorDialogComponent>,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.student = data.student;
    this.isSecondaryMentor = data.isSecondaryMentor === true;

    this.mentorName = this.isSecondaryMentor ? this.student.secondaryMentorName : this.student.mentorName;

    this.form = this.fb.group({
      messageToMentor: [null, Validators.required],
    });
  }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendEmail() {
    const message = this.form.get("messageToMentor").value;
    this.dialogRef.close();
    this.commonService.sendMessageToMentor(this.student, message, this.isSecondaryMentor).subscribe(() => {
      this.snackBar.open("Message Sent", "Close", { duration: 3000 });
    });
  }

  @HostListener("window:keypress", ["$event"])
  keyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      this.sendEmail();
      e.preventDefault();
    }
  }
}
