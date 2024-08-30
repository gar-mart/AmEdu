import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AppComponent } from "app/app.component";
import { AvatarDialogComponent } from "app/design";
import { PointsType } from "app/enums";
import { PagePointSource } from "app/enums/page-point-source.enum";
import { Class, ClassUser, Points } from "app/models";
import { environment } from "environments/environment";
import { Observable, Subscription, of } from "rxjs";
import { debounceTime, distinctUntilChanged, startWith, switchMap } from "rxjs/operators";
import { AbsencesDialogComponent } from "..";
import { EnrollmentStatus } from "../../../../enums/enrollment-status.enum";
import { Absence } from "../../../../models/absence";
import { Tardiness } from "../../../../models/tardiness.model";
import { CommonService } from "../../../../services";
import { AwardPointDialogComponent } from "../../../components";
import { StaffService } from "../../../services";
import { TeacherService } from "../../services";
import { TardinessDialogComponent } from "./components/tardiness-dialog/tardiness-dialog.component";

@Component({
  selector: "app-live-lessons",
  templateUrl: "./live-lessons.component.html",
  styleUrls: ["./live-lessons.component.scss"],
})
export class LiveLessonsComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;

  private readonly subscriptions: Subscription[] = [];

  readonly environment = environment;
  readonly PointsType = PointsType;
  readonly minDate = new Date("2020-1-1");
  readonly maxDate = new Date("2050-12-31");
  readonly displayedColumns: string[] = [
    "hasLiveLessonPoint",
    "firstName",
    "lastName",
    "respectPoints",
    "integrityPoints",
    "stewardshipPoints",
    "engagementPoints",
    "tardiness",
    "absences",
  ];

  dataSource = new MatTableDataSource();
  dateFilter = new UntypedFormControl();
  classFilter = new UntypedFormControl();
  classOptions: Observable<Class[]>;
  selectedClass: Class;
  classUsers: ClassUser[];
  saving = false;
  editingAttendance = false;

  constructor(
    private teacherService: TeacherService,
    private staffService: StaffService,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private appComponent: AppComponent
  ) {
    this.appComponent.isBusy = true;
    this.maxDate.setFullYear(new Date().getFullYear() + 50);
  }

  ngOnInit() {
    this.classOptions = this.classFilter.valueChanges.pipe(
      startWith(""),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        this.editingAttendance = false;
        if (val && val.id) {
          // our val represents a class object in this case
          this.selectedClass = val;
          this.loadDatatable();
          return this.classOptions;
        }
        return this.loadClasses(val);
      })
    );
    this.dateFilter.patchValue(new Date());
    this.subscriptions.push(
      this.dateFilter.valueChanges.subscribe(val => {
        this.editingAttendance = false;
        if (this.selectedClass) {
          if (!(new Date(this.selectedClass.startDate) <= val && val <= new Date(this.selectedClass.endDate))) {
            this.selectedClass = null;
            this.classFilter.patchValue("");
            this.updateDatatable([]);
          } else {
            this.loadDatatable();
          }
        } else {
          // hacky way to trigger valueChanges to reload class options
          this.classFilter.patchValue(this.classFilter.value === "" ? null : "");
        }
      })
    );
    this.classFilter.patchValue("");
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  loadClasses(val): Observable<Class[]> {
    return this.teacherService.returnClasses(this.dateFilter.value, val).pipe(
      switchMap(classes => {
        if (!classes.length && val) {
          this.snackBar.open("No classes found", "Close", { panelClass: "success", duration: 3500 });
        }
        return of(classes);
      })
    );
  }

  loadDatatable() {
    this.appComponent.isBusy = true;
    const loadDate = this.dateFilter.value;
    const classId = this.selectedClass.id;
    this.teacherService.returnClassUsers(this.selectedClass.id, this.dateFilter.value).subscribe(items => {
      items = items.filter(item => item.status === EnrollmentStatus.Active); // only show active enrollments on this screen.

      if (loadDate === this.dateFilter.value && classId === this.selectedClass.id) {
        if (!items.length) {
          this.snackBar.open("No students found", "Close", { panelClass: "success", duration: 3500 });
        }
        this.updateDatatable(items);
      }

      this.appComponent.isBusy = false;
    });
  }

  updateDatatable(classUsers: ClassUser[]) {
    this.classUsers = classUsers;
    this.dataSource = new MatTableDataSource(classUsers);

    this.dataSource.sortingDataAccessor = (data, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === "string") {
        return data[sortHeaderId].toLocaleLowerCase();
      }

      return data[sortHeaderId];
    };

    this.dataSource.sort = this.sort;
    this.appComponent.isBusy = false;
  }

  displayClass(item: Class) {
    return item ? item.name : "";
  }

  selectAll(event: MatCheckboxChange) {
    if (this.classUsers && this.classUsers.length) {
      this.classUsers.forEach(classUser => {
        classUser.hasLiveLessonPoint = event.checked;
      });
      this.editingAttendance = true;
    }
  }

  editAttendance() {
    this.editingAttendance = true;
  }

  saveAttendance() {
    this.appComponent.isBusy = true;
    this.saving = true;
    this.teacherService
      .updateLiveLessonPoints(
        { classId: this.selectedClass.id, date: this.dateFilter.value },
        this.classUsers.filter(classUser => classUser.hasLiveLessonPoint).map(classUser => classUser.userId)
      )
      .subscribe(result => {
        if (result) {
          this.editingAttendance = false;
        } else {
          this.snackBar.open("Failed to save attendance", "Close", { panelClass: "success", duration: 3500 });
        }
        this.appComponent.isBusy = false;
        this.saving = false;
      });
  }

  updateTardiness(classUser: ClassUser) {
    const initialTardiness: Tardiness = {
      classId: this.selectedClass.id,
      userId: classUser.userId,
      date: this.dateFilter.value,
      comment: classUser.tardinessComment,
      type: classUser.tardiness,
    };

    this.dialog
      .open(TardinessDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: { studentName: classUser.name, tardiness: initialTardiness },
      })
      .afterClosed()
      .subscribe((tardiness: Tardiness) => {
        if (!tardiness) {
          return; // user hit cancel
        }

        this.appComponent.isBusy = true;
        this.saving = true;

        this.teacherService.updateTardiness(tardiness).subscribe(result => {
          if (result) {
            // update view
            classUser.tardiness = tardiness.type;
            classUser.tardinessComment = tardiness.comment;
          } else {
            this.snackBar.open("Failed to update tardiness", "Close", { panelClass: "success", duration: 3500 });
          }

          this.appComponent.isBusy = false;
          this.saving = false;
        });
      });
  }

  updateAbsences(classUser: ClassUser) {
    const initialAbsence: Absence = {
      id: classUser.absenceId,
      userId: classUser.userId,
      startDate: classUser.absenceId ? classUser.absenceStartDate : this.dateFilter.value,
      endDate: classUser.absenceId ? classUser.absenceEndDate : this.dateFilter.value,
      reason: classUser.absenceReason,
    };

    this.dialog
      .open(AbsencesDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: { studentName: classUser.name, absence: initialAbsence },
      })
      .afterClosed()
      .subscribe((absence: Absence) => {
        if (!absence) {
          return; // user hit cancel
        }

        this.appComponent.isBusy = true;
        this.saving = true;

        this.teacherService.updateAbsence(absence).subscribe(
          result => {
            if (result) {
              const isDeleted = absence.reason === null;
              if (isDeleted) {
                classUser.absenceReason = null;
                classUser.absenceEndDate = undefined;
                classUser.absenceStartDate = undefined;
                classUser.absenceId = undefined;
              } else {
                classUser.absenceReason = absence.reason;
                classUser.absenceStartDate = absence.startDate;
                classUser.absenceEndDate = absence.endDate;
                classUser.absenceId = typeof result === "number" ? Number(result) : absence.id;
              }
            } else {
              this.snackBar.open("Failed to update excused absence.", "Close", {
                panelClass: "success",
                duration: 3500,
              });
            }

            this.appComponent.isBusy = false;
            this.saving = false;
          },
          err => {
            this.saving = false;
            this.appComponent.isBusy = false;
            if (err.error && err.error.startsWith("System.Data.SqlClient.SqlException")) {
              this.snackBar.open(err.error.split("\n")[0], "Close", { panelClass: "error", duration: 3500 });
            }
          }
        );
      });
  }

  recordPoint(classUser: ClassUser, type: PointsType, value: number) {
    if (this.saving) {
      return;
    }

    // validate
    switch (type) {
      case PointsType.Integrity:
        if (classUser.integrityPoints + value < 0) {
          return; // don't allow negative points
        }
        break;
      case PointsType.Stewardship:
        if (classUser.stewardshipPoints + value < 0) {
          return; // don't allow negative points
        }
        break;
      case PointsType.Respect:
        if (classUser.respectPoints + value < 0) {
          return; // don't allow negative points
        }
        break;
      case PointsType.Engagement:
        if (classUser.engagementPoints + value < 0) {
          return; // don't allow negative points
        }
        break;
    }

    const points: Points = { userId: classUser.userId, type, value, pageSource: PagePointSource.LiveLessonsPage };

    this.dialog
      .open(AwardPointDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: { student: { name: classUser.name }, points },
      })
      .afterClosed()
      .subscribe(submit => {
        if (!submit) {
          return;
        }

        // update
        switch (type) {
          case PointsType.Integrity:
            classUser.integrityPoints += value;
            break;
          case PointsType.Stewardship:
            classUser.stewardshipPoints += value;
            break;
          case PointsType.Respect:
            classUser.respectPoints += value;
            break;
          case PointsType.Engagement:
            classUser.engagementPoints += value;
            break;
        }

        this.appComponent.isBusy = true;
        this.saving = true;
        this.staffService.createPoints(points).subscribe(result => {
          if (!result) {
            this.snackBar.open("Failed to record points", "Close", { panelClass: "success", duration: 3500 });
            switch (type) {
              case PointsType.Integrity:
                classUser.integrityPoints -= value;
                break;
              case PointsType.Stewardship:
                classUser.stewardshipPoints -= value;
                break;
              case PointsType.Respect:
                classUser.respectPoints -= value;
                break;
              case PointsType.Engagement:
                classUser.engagementPoints -= value;
                break;
            }
          }
          this.appComponent.isBusy = false;
          this.saving = false;
        });
      });
  }

  openStudentAvatarDialog(classUser: ClassUser) {
    if (this.saving) {
      return;
    }

    this.appComponent.isBusy = true;
    this.saving = true;
    this.commonService.getStudentById(classUser.userId).subscribe(student => {
      this.appComponent.isBusy = false;
      this.dialog
        .open(AvatarDialogComponent, {
          autoFocus: false,
          panelClass: ["rounded-dialog-window"],
          data: { student },
        })
        .beforeClosed()
        .subscribe(() => (this.saving = false));
    });
  }
}
