import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AdminService } from "@services/admin.service";
import { AppComponent } from "app/app.component";
import { Enrollment, Student } from "app/models";
import { CommonService } from "app/services";

@Component({
  selector: "app-enrollment-import",
  templateUrl: "./enrollment-import.component.html",
  styleUrls: ["./enrollment-import.component.scss"],
})
export class EnrollmentImportComponent implements OnInit {
  uploadingFile = false;
  fileUploaded = false;
  importComplete = false;

  displayedColumns = [
    "moreOptions",
    "firstName",
    "lastName",
    "email",
    "enrollmentDate",
    "unenrollmentDate",
    "uicNumber",
  ];

  singleMatchSource = new MatTableDataSource<Enrollment>();
  @ViewChild(MatSort) singleMatchSort: MatSort;

  multipleMatchSource = new MatTableDataSource<Enrollment>();
  @ViewChild(MatSort) multipleMatchSort: MatSort;

  noMatchSource = new MatTableDataSource<Enrollment>();
  @ViewChild(MatSort) noMatchSort: MatSort;

  students: Student[] = [];

  constructor(
    private adminService: AdminService,
    public appComponent: AppComponent,
    private commonService: CommonService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    setTimeout(() => (this.appComponent.isBusy = true));
    this.commonService
      .getAllStudents()
      .subscribe(students => {
        this.students = students.sort((a, b) => a.studentEmail.localeCompare(b.studentEmail));
      })
      .add(() => (this.appComponent.isBusy = false));
  }

  uploadInputChange(fileInputEvent) {
    const file: File = fileInputEvent.target.files[0];
    if (![".xlsx"].some(validExtension => file.name.toLowerCase().endsWith(validExtension))) {
      this.snackBar.open(`That file is not an Excel (.xlsx) file.`, "Close", { panelClass: "success", duration: 5000 });
      return;
    }

    this.appComponent.isBusy = this.uploadingFile = true;
    const singleMatchData: Enrollment[] = [];
    const multipleMatchData: Enrollment[] = [];
    const noMatchData: Enrollment[] = [];

    //try
    this.adminService
      .uploadEnrollmentImportData(file)
      .subscribe(
        enrollments => {
          enrollments.forEach(enrollment => {
            if (enrollment.id) {
              if (enrollment.hasMultipleMatches) {
                multipleMatchData.push(enrollment);
              } else {
                singleMatchData.push(enrollment);
              }
            } else {
              noMatchData.push(enrollment);
            }
          });

          this.fileUploaded = true;
        },
        (e: HttpErrorResponse) => {
          //catch
          if (e.status === 400) {
            this.snackBar.open(e.error, "Close", { panelClass: "success" });
          }
          this.fileUploaded = false;
        }
      )
      .add(() => {
        //finally
        this.appComponent.isBusy = this.uploadingFile = false;
        this.singleMatchSource.data = singleMatchData;
        this.multipleMatchSource.data = multipleMatchData;
        this.noMatchSource.data = noMatchData;
        this.importComplete = false;
      });
  }

  deleteRow(enrollment: Enrollment, source: MatTableDataSource<unknown>) {
    source.data = source.data.filter(e => e !== enrollment);
  }

  markRowValid(enrollment: Enrollment, source: MatTableDataSource<unknown>) {
    source.data = source.data.filter(e => e !== enrollment);
    const singleMatches = this.singleMatchSource.data;
    singleMatches.unshift(enrollment);
    this.singleMatchSource.data = singleMatches;
  }

  submitEnrollment() {
    if (this.noMatchSource.data.length || this.multipleMatchSource.data.length) {
      this.snackBar.open(
        'Please resolve the "No matches" and "Multiple matches" enrollments before submission.',
        "Close",
        { panelClass: "success", duration: 5000 }
      );
    }

    this.appComponent.isBusy = true;
    this.adminService
      .updateEnrollments(this.singleMatchSource.data)
      .subscribe(result => {
        if (result) {
          this.importComplete = true;
          this.snackBar.open("Enrollments were successfully updated!.", "Close", {
            panelClass: "success",
            duration: 3000,
          });
        } else {
          this.snackBar.open("Enrollments failed to update.", "Close", { panelClass: "success" });
        }
      })
      .add(() => {
        this.appComponent.isBusy = false;
      });
  }

  studentSelected(selectedStudent: Student, enrollment: Enrollment) {
    const duplicateSingleMatches = this.singleMatchSource.data.filter(e => e.id === selectedStudent.id);
    const duplicateMultipleMatches = this.multipleMatchSource.data.filter(e => e.id === selectedStudent.id);
    if (duplicateSingleMatches.length || duplicateMultipleMatches.length) {
      this.snackBar.open("You cannot select a student that exists in one of the other tables.", "Close", {
        panelClass: "success",
        duration: 3000,
      });
      return;
    }

    enrollment.id = selectedStudent.id;
    enrollment.email = selectedStudent.studentEmail;

    this.markRowValid(enrollment, this.noMatchSource);
  }

  filterStudents(email: string) {
    if (email) {
      return this.students.filter(student => student.studentEmail.toLowerCase().includes(email));
    }
    return this.students;
  }
}
