import { Component, HostListener, Inject, OnInit, ViewChild } from "@angular/core";
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Student, StudentInformation } from "app/models";
import { StudentService } from "app/services";
import { environment } from "environments/environment";
import { AppComponent } from "../../../app.component";

@Component({
  selector: "app-avatar-dialog",
  templateUrl: "./avatar-dialog.component.html",
  styleUrls: ["./avatar-dialog.component.scss"],
})
export class AvatarDialogComponent implements OnInit {
  @ViewChild("formDirective") private formDirective: NgForm;
  form: UntypedFormGroup;

  imageUrl = "";
  student: Student;
  studentInformation: StudentInformation;
  showStudentPageLink = true;

  preferredContactOptions = this.buildPreferredContactOptions();
  bestTimeToReachOptions = this.buildBestTimeToReachOptions();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { student: Student; hideStudentPageLink?: boolean },
    private dialogRef: MatDialogRef<AvatarDialogComponent>,
    private studentService: StudentService,
    private formBuilder: UntypedFormBuilder,
    public appComponent: AppComponent
  ) {
    this.imageUrl = environment.apiUrl + "/Common/ReturnProfilePicture/" + data.student.id;
    this.student = data.student;
    this.showStudentPageLink = !data.hideStudentPageLink;
    this.form = formBuilder.group({});
  }

  ngOnInit() {
    this.appComponent.isBusy = true;
    this.studentService.returnStudentInformationById(this.student.id).subscribe(studentInformation => {
      this.appComponent.isBusy = false;
      this.studentInformation = studentInformation;
      const phonePattern = /\([0-9]{3}\) [0-9]{3}-[0-9]{4}/;
      this.form = this.formBuilder.group({
        notes: [studentInformation.notes, Validators.maxLength(250)],
        // guardian contact information
        guardianName: [studentInformation.guardianName, Validators.maxLength(100)],
        preferredWayToContactGuardian: [studentInformation.preferredWayToContactGuardian || 1],
        bestTimeToReachGuardian: [studentInformation.bestTimeToReachGuardian || 1],
        guardianPhoneNumber: [
          studentInformation.guardianPhoneNumber,
          [Validators.maxLength(20), Validators.pattern(phonePattern)],
        ],
        guardianEmailAddress: [studentInformation.guardianEmailAddress, [Validators.maxLength(320), Validators.email]],
        guardianIsSubscribedToWeeklySnapshotEmail: [studentInformation.guardianIsSubscribedToWeeklySnapshotEmail],
        secondaryGuardianIsSubscribedToWeeklySnapshotEmail: [
          studentInformation.secondaryGuardianIsSubscribedToWeeklySnapshotEmail,
        ],
        guardianRelationship: [
          studentInformation.guardianRelationship,
          [Validators.required, Validators.maxLength(50)],
        ],
        // secondary guardian contact information
        secondaryGuardianName: [studentInformation.secondaryGuardianName, Validators.maxLength(100)],
        secondaryGuardianPhoneNumber: [
          studentInformation.secondaryGuardianPhoneNumber,
          [Validators.maxLength(20), Validators.pattern(phonePattern)],
        ],
        secondaryGuardianEmailAddress: [
          studentInformation.secondaryGuardianEmailAddress,
          [Validators.maxLength(320), Validators.email],
        ],
        secondaryGuardianRelationship: [studentInformation.secondaryGuardianRelationship, [Validators.maxLength(50)]],
        // student contact information
        preferredWayToContactStudent: [studentInformation.preferredWayToContactStudent || 1],
        bestTimeToReachStudent: [studentInformation.bestTimeToReachStudent || 1],
        homeAddress: [studentInformation.homeAddress, Validators.maxLength(100)],
        city: [studentInformation.city, Validators.maxLength(60)],
        state: [studentInformation.state, Validators.maxLength(40)],
        zipCode: [studentInformation.zipCode, Validators.pattern(/^\d{5}$/)],
        notesAboutMe: [studentInformation.notesAboutMe, Validators.maxLength(1000)],
        studentPhoneNumber: [
          studentInformation.studentPhoneNumber,
          [Validators.maxLength(20), Validators.pattern(phonePattern)],
        ],
        studentEmailAddress: [studentInformation.studentEmailAddress, [Validators.maxLength(320), Validators.email]],
        studentBirthday: [studentInformation.studentBirthday],
        // readonly fields
        studentId: [this.student.id],
        schoolEmailAddress: [this.student.studentEmail],
      });
    });
  }

  confirm() {
    if (this.appComponent.isBusy || !this.form.valid) {
      return;
    }
    this.appComponent.isBusy = true;

    const item: StudentInformation = Object.assign({}, this.form.value);
    this.studentService.updateStudentInformation(item).subscribe(() => {
      this.appComponent.isBusy = false;
      this.formDirective.resetForm();
      this.dialogRef.close(this.normalizeResult(item));
    });
  }

  close() {
    this.formDirective.resetForm();
    this.dialogRef.close();
  }

  @HostListener("window:keydown", ["$event"])
  keyDown(e) {
    const enterKeyCode = 13;
    if (e.keyCode === enterKeyCode) {
      if (this.form.pristine) {
        this.close();
      } else {
        this.confirm();
      }
      e.preventDefault();
    }
  }

  private normalizeResult(item: StudentInformation): StudentInformation {
    item.bestTimeToReachGuardian = this.bestTimeToReachOptions.filter(
      option => option.value === item.bestTimeToReachGuardian
    )[0].name;
    item.bestTimeToReachStudent = this.bestTimeToReachOptions.filter(
      option => option.value === item.bestTimeToReachStudent
    )[0].name;
    item.preferredWayToContactGuardian = this.preferredContactOptions.filter(
      option => option.value === item.preferredWayToContactGuardian
    )[0].name;
    item.preferredWayToContactStudent = this.preferredContactOptions.filter(
      option => option.value === item.preferredWayToContactStudent
    )[0].name;
    return item;
  }

  private buildPreferredContactOptions(): { name: string; value: number }[] {
    const result = [];
    result.push({ name: "Email", value: 1 });
    result.push({ name: "Phone", value: 2 });
    result.push({ name: "Text", value: 3 });
    return result;
  }

  private buildBestTimeToReachOptions(): { name: string; value: number }[] {
    const result = [];
    result.push({ name: "Morning", value: 1 });
    result.push({ name: "Afternoon", value: 2 });
    result.push({ name: "Evening", value: 3 });
    return result;
  }
}
