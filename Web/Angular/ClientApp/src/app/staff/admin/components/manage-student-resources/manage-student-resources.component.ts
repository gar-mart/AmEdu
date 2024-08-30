import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";

import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { StudentResource } from "@models/student-resource.model";
import { AdminService } from "@services/admin.service";
import { Constants, Utility } from "app/shared";
import { ManageStudentResourcesDialogComponent } from "..";

@Component({
  selector: "app-manage-student-resources",
  templateUrl: "./manage-student-resources.component.html",
  styleUrls: ["./manage-student-resources.component.scss"],
})
export class ManageStudentResourcesComponent implements OnInit {
  displayedColumns: string[] = ["moreOptions", "title", "category", "url", "grade", "showOnStudentDashboard"];
  dataSource = new MatTableDataSource();
  grades: string[] = Constants.grades;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private dialog: MatDialog, private adminService: AdminService) {}

  ngOnInit() {
    this.loadDatatable();
  }

  loadDatatable() {
    this.adminService.returnStudentResources().subscribe(result => {
      const resultWithStrings = this.buildGradeLevelStrings(result);
      this.dataSource = new MatTableDataSource(resultWithStrings);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  buildGradeLevelStrings(studentResources: StudentResource[]) {
    for (let i = 0; i < studentResources.length; i++) {
      const record = studentResources[i];
      let gradeLevels = record.studentResourceGradeLevels.map(item => item.gradeLevel);
      record.gradeLevelString = Utility.buildGradeLevelString(gradeLevels);
      studentResources[i] = record;
    }
    return studentResources;
  }

  editResource(resource: StudentResource) {
    this.dialog
      .open(ManageStudentResourcesDialogComponent, {
        data: resource,
      })
      .beforeClosed()
      .subscribe(result => {
        if (result) {
          this.loadDatatable();
        }
      });
  }

  newResource() {
    this.dialog
      .open(ManageStudentResourcesDialogComponent)
      .beforeClosed()
      .subscribe(result => {
        if (result) {
          this.loadDatatable();
        }
      });
  }
}
