import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Elective } from "@models/elective";
import { ElectiveGroup } from "@models/elective-group";
import { ElectiveSetting } from "@models/elective-setting.model";
import { AdminService } from "@services/admin.service";
import { CommonService } from "@services/common.service";
import { Utility } from "app/shared";
import { Observable } from "rxjs";
import { ElectiveDialogComponent } from "..";

@Component({
  selector: "app-manage-electives",
  templateUrl: "./manage-electives.component.html",
  styleUrls: ["./manage-electives.component.scss"],
})
export class ManageElectivesComponent implements OnInit {
  displayedColumnsElectivesTab: string[] = [
    "moreOptions",
    "name",
    "hasPrerequisite",
    "communityPassport",
    "gradeLevel",
    "semesterOne",
    "semesterTwo",
    "isPartOfGroup",
  ];
  displayedColumnsSettingsTab: string[] = [
    "gradeLevel",
    "requiredElectivesPerSemester1",
    "requiredElectivesPerSemester2",
  ];
  dataSourceElectivesTab = new MatTableDataSource();
  dataSourceSettingsTab = new MatTableDataSource();

  electiveSettings: ElectiveSetting[];
  electiveGroups: ElectiveGroup[];
  electiveGroupsSemester1: ElectiveGroup[];
  electiveGroupsSemester2: ElectiveGroup[];
  electives: Elective[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private adminService: AdminService,
    private commonService: CommonService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadDataTable();

    this.commonService.returnElectivesBySearch("").subscribe(r => {
      this.electives = r;
    });

    this.commonService.returnElectiveSettings().subscribe(result => {
      this.dataSourceSettingsTab = new MatTableDataSource(result);
    });
  }

  loadElectives(val): Observable<Elective[]> {
    return this.commonService.returnElectivesBySearch(val);
  }

  loadDataTable() {
    this.commonService.returnElectiveGroups().subscribe(result => {
      const resultWithStrings = this.buildElectiveGroupGradeLevelStrings(result);
      this.electiveGroups = resultWithStrings;

      this.electiveGroupsSemester1 = this.electiveGroups.filter(x => x.semester === 1);
      this.electiveGroupsSemester2 = this.electiveGroups.filter(x => x.semester === 2);
    });

    this.commonService.returnElectives().subscribe(result => {
      let resultWithStrings = this.buildElectiveGradeLevelStrings(result);
      this.dataSourceElectivesTab = new MatTableDataSource(resultWithStrings);
      this.dataSourceElectivesTab.paginator = this.paginator;
      this.dataSourceElectivesTab.sort = this.sort;
    });

    this.commonService.returnElectivesBySearch("").subscribe(r => {
      this.electives = r;
    });
  }

  newElective() {
    this.dialog
      .open(ElectiveDialogComponent)
      .beforeClosed()
      .subscribe(result => {
        if (result) {
          this.loadDataTable();
        }
      });
  }

  newElectiveGroup(passedSemester: number) {
    const electiveGroup = {
      semester: passedSemester,
      numberOfRequiredChoices: 0,
    } as ElectiveGroup;

    this.adminService.createElectiveGroup(electiveGroup).subscribe(r => {
      if (r) {
        this.loadDataTable();
      }
    });
  }

  editElective(elective: Elective) {
    this.dialog
      .open(ElectiveDialogComponent, {
        data: elective,
      })
      .beforeClosed()
      .subscribe(result => {
        if (result) {
          this.loadDataTable();
        }
      });
  }

  buildElectiveGroupGradeLevelStrings(electiveGroup: ElectiveGroup[]) {
    electiveGroup.forEach(e => {
      e.electiveGroupChoices.forEach(x => {
        const gradeLevels = x.semesterElectives.map(item => item.gradeLevel);
        x.gradeLevelString = Utility.buildGradeLevelString(gradeLevels);
      });
    });

    return electiveGroup;
  }

  save() {
    this.adminService.updateElectiveSettings(this.dataSourceSettingsTab.data as ElectiveSetting[]).subscribe(r => {
      if (r) {
        this.snackBar.open("Elective settings saved successfully.", "Close", { panelClass: "success", duration: 3000 });
      }
    });
  }

  buildElectiveGradeLevelStrings(electives: Elective[]) {
    for (let i = 0; i < electives.length; i++) {
      const elective = electives[i];

      let gradeLevels = elective.semesterElectives.map(item => item.gradeLevel);
      elective.gradeLevelString = Utility.buildGradeLevelString(gradeLevels);

      let semesters = elective.semesterElectives.map(item => item.semester);
      semesters.forEach(s => {
        s === 1 ? (elective.semesterOne = true) : (elective.semesterTwo = true);
      });
    }

    return electives;
  }
}
