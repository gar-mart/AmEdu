import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AvatarDialogComponent } from "@design/avatar-dialog/avatar-dialog.component";
import { CommonService } from "@services/common.service";
import { Staff, Student } from "app/models";
import { Constants } from "app/shared";
import { environment } from "environments/environment";
import { Observable, Subject, Subscription } from "rxjs";

@Component({
  selector: "app-manage-students",
  templateUrl: "./manage-students.component.html",
  styleUrls: ["./manage-students.component.scss"],
})
export class ManageStudentsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  readonly environment = environment;
  readonly displayedColumns: string[] = [
    "options",
    "name",
    "gradeLevel",
    "mentor",
    "secondaryMentor",
    "progressPercent",
    "timeRemaining",
  ];
  readonly gradeLevels: string[] = Constants.grades;

  private filterValues = { studentName: "", gradeLevel: "", email: "" };
  private _componentDestroyed$: Subject<boolean> = new Subject();

  dataSource = new MatTableDataSource();
  filteredOptions$: Observable<string[]>;
  mentors: Staff[] = [];
  filteredMentors$: Observable<Staff[]>;
  studentNameFilter = new UntypedFormControl();
  gradeLevelFilter = new UntypedFormControl();
  emailFilter = new UntypedFormControl();
  paging = false;

  subscriptions: Subscription[] = [];

  constructor(private commonService: CommonService, private dialog: MatDialog) {}

  ngOnInit() {
    this.commonService.getAllStudents().subscribe(result => {
      this.dataSource = new MatTableDataSource(result);

      this.dataSource.sortingDataAccessor = (data, sortHeaderId: string): string => {
        if (typeof data[sortHeaderId] === "string") {
          return data[sortHeaderId].toLocaleLowerCase();
        }

        return data[sortHeaderId];
      };

      this.subscriptions.push(
        this.studentNameFilter.valueChanges.subscribe(value => {
          this.filterValues["studentName"] = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }),

        this.gradeLevelFilter.valueChanges.subscribe(value => {
          this.filterValues["gradeLevel"] = value;
          if (value === "All") {
            this.dataSource.filter = "";
          }
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }),

        this.emailFilter.valueChanges.subscribe(value => {
          this.filterValues["email"] = value;
          if (value === "All") {
            this.dataSource.filter = "";
          }
          this.dataSource.filter = JSON.stringify(this.filterValues);
        })
      );

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.customFilterPredicate();
      this.gradeLevelFilter.patchValue("All");
      this.emailFilter.patchValue("AmEdustudents.org");
    });

    this.commonService.getMentors().subscribe(result => {
      this.mentors = result;
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this._componentDestroyed$.next(true);
    this._componentDestroyed$.complete();
  }

  displayFn(mentor?: Staff): Staff | undefined {
    return mentor ? mentor : undefined;
  }

  assignMentorToStudent(studentId: number, mentorId: number) {
    this.commonService.assignMentorToStudent(studentId, mentorId).subscribe();
  }

  setStudentGradeLevel(student: Student, gradeLevel: string) {
    this.commonService.setStudentGradeLevel(student.id, gradeLevel).subscribe(result => {
      student.mentorId = result;
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

  customFilterPredicate() {
    const gl = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    const filterFunction = function (data: Student, filter: string): boolean {
      const searchTerms = JSON.parse(filter);
      if (data.gradeLevel === null) {
        data.gradeLevel = "";
      }
      if (searchTerms.gradeLevel === "All") {
        if (searchTerms.email === "All") {
          return (
            data.name.toLowerCase().indexOf(searchTerms.studentName.toLowerCase()) !== -1 &&
            (data.gradeLevel === "" || gl.includes(data.gradeLevel)) &&
            (data.studentEmail.toLowerCase().includes("AmEdustudents.org") ||
              data.studentEmail.toLowerCase().includes("innocademystudents.com"))
          );
        } else {
          return (
            data.name.toLowerCase().indexOf(searchTerms.studentName.toLowerCase()) !== -1 &&
            (data.gradeLevel === "" || gl.includes(data.gradeLevel)) &&
            data.studentEmail.toLowerCase().includes(searchTerms.email.toLowerCase())
          );
        }
      } else {
        if (searchTerms.email === "All") {
          return (
            data.name.toLowerCase().indexOf(searchTerms.studentName.toLowerCase()) !== -1 &&
            data.gradeLevel === searchTerms.gradeLevel &&
            (data.studentEmail.toLowerCase().includes("AmEdustudents.org") ||
              data.studentEmail.toLowerCase().includes("innocademystudents.com"))
          );
        } else {
          return (
            data.name.toLowerCase().indexOf(searchTerms.studentName.toLowerCase()) !== -1 &&
            data.gradeLevel === searchTerms.gradeLevel &&
            data.studentEmail.toLowerCase().includes(searchTerms.email.toLowerCase())
          );
        }
      }
    };
    return filterFunction;
  }

  assignSecondaryMentorToStudent(studentId: number, mentorId: number) {
    this.commonService.assignSecondaryMentorToStudent(studentId, mentorId).subscribe();
  }

  getCompletionTimeStringFormat(row: Student): string {
    let completionTime = "";

    if (row.orientationStartTime !== null && row.orientationFinishTime !== null) {
      completionTime = "IN ";

      const diff = new Date(row.orientationFinishTime).getTime() - new Date(row.orientationStartTime).getTime();
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff - days * 86400000) / 3600000);
      const minutes = Math.floor((diff - days * 86400000 - hours * 3600000) / 60000);

      if (days > 0) {
        completionTime += `${days}d `;
      }
      if (days > 0 || hours > 0) {
        completionTime += `${hours}h `;
      }
      completionTime += `${minutes}m`;
    }

    return completionTime;
  }
}
