import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CommonService } from "@services/common.service";
import { Staff, Student } from "app/models";
import { Constants } from "app/shared";
import { Subscription } from "rxjs";
import { AppComponent } from "../../../../app.component";
import { AssignStudentsToMentorDialogComponent } from "./components/assign-students-to-mentor-dialog/assign-students-to-mentor-dialog.component";
import { EditStaffDialogComponent } from "./components/edit-staff-dialog/edit-staff-dialog.component";
import { ViewMenteesDialogComponent } from "./components/view-mentees-dialog/view-mentees-dialog.component";

export interface StaffMember {
  staffId: number;
  accountName: string;
  accountEmail: string;
  isAdmin: boolean;
  isMentor: boolean;
}

@Component({
  selector: "app-manage-staff",
  templateUrl: "./manage-staff.component.html",
  styleUrls: ["./manage-staff.component.scss"],
})
export class ManageStaffComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  readonly displayedColumns = [
    "moreOptions",
    "name",
    "isAdmin",
    "isTeacher",
    "isReFuelCoordinator",
    "isInterventionist",
    "menteeCount",
    "appointmentLink",
    "introVideoId",
    "mentorGrades",
    "counselorGrades",
  ];
  readonly youtubeUrlPrefix = Constants.youtubeUrlPrefix;

  private filterValues = { name: "", email: "" };

  dataSource = new MatTableDataSource();
  studentList: Student[];
  staffList: Staff[];
  emailFilter = new UntypedFormControl();

  subscriptions: Subscription[] = [];

  constructor(
    private commonService: CommonService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private appComponent: AppComponent
  ) {
    this.appComponent.isBusy = true;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.emailFilter.valueChanges.subscribe(value => {
        this.filterValues.email = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      })
    );

    this.emailFilter.patchValue("All");

    this.loadDatatable();
    this.commonService.getAllStudents().subscribe(result => {
      this.studentList = result;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  loadDatatable() {
    this.commonService.getAllStaff().subscribe(allStaff => {
      this.dataSource = new MatTableDataSource(allStaff);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.customFilterPredicate();
      this.dataSource.filter = JSON.stringify(this.filterValues);
      this.appComponent.isBusy = false;
    });
  }

  customFilterPredicate() {
    const filterFunction = function (data: Student, filter: string): boolean {
      const searchTerms: { name: string; email: string } = JSON.parse(filter);

      return (
        (searchTerms.email === "All" || data.email.toLowerCase().includes(searchTerms.email)) &&
        (!searchTerms.name || data.name.toLowerCase().includes(searchTerms.name))
      );
    };
    return filterFunction;
  }

  applyFilter(filterValue: string) {
    this.filterValues.name = filterValue.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  openAssignStudentsDialog(staffMember: Staff) {
    const dialogRef = this.dialog.open(AssignStudentsToMentorDialogComponent, {
      width: "650px",
      autoFocus: false,
      panelClass: ["rounded-dialog-window"],
      data: {
        staffMember,
        studentList: this.studentList,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.appComponent.isBusy = true;
      this.loadDatatable();
    });
  }

  openViewMenteesDialog(staffMember: Staff) {
    this.dialog.open(ViewMenteesDialogComponent, {
      width: "650px",
      autoFocus: false,
      panelClass: ["rounded-dialog-window"],
      data: {
        staffMember,
      },
    });
  }

  setAdmin(userId: number, isAdmin: boolean) {
    this.appComponent.isBusy = true;
    this.commonService
      .setAdmin(userId, isAdmin)
      .subscribe(result => {
        if (!result) {
          this.snackBar.open("Failed to update admin", "Close", { panelClass: "success", duration: 3500 });
        }
      })
      .add(() => (this.appComponent.isBusy = false));
  }

  setTeacher(userId: number, isTeacher: boolean) {
    this.appComponent.isBusy = true;
    this.commonService
      .setTeacher(userId, isTeacher)
      .subscribe(result => {
        if (!result) {
          this.snackBar.open("Failed to update teacher", "Close", { panelClass: "success", duration: 3500 });
        }
      })
      .add(() => (this.appComponent.isBusy = false));
  }

  setReFuelCoordinator(userId: number, isReFuelCoordinator: boolean) {
    this.appComponent.isBusy = true;
    this.commonService
      .setReFuelCoordinator(userId, isReFuelCoordinator)
      .subscribe(result => {
        if (!result) {
          this.snackBar.open("Failed to update RE:Fuel coordinator", "Close", {
            panelClass: "success",
            duration: 3500,
          });
        }
      })
      .add(() => (this.appComponent.isBusy = false));
  }

  setInterventionist(userId: number, isInterventionist: boolean) {
    this.appComponent.isBusy = true;
    this.commonService
      .setInterventionist(userId, isInterventionist)
      .subscribe(result => {
        if (!result) {
          this.snackBar.open("Failed to update interventionist", "Close", { panelClass: "success", duration: 3500 });
        }
      })
      .add(() => (this.appComponent.isBusy = false));
  }

  edit(staffMember: Staff) {
    this.dialog.open(EditStaffDialogComponent, {
      data: { staffMember },
      panelClass: ["rounded-dialog-window"],
    });
  }
}
