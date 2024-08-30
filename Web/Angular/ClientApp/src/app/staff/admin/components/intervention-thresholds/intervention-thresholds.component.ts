import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AdminService } from "@services/admin.service";
import { AppComponent } from "app/app.component";
import { InterventionThreshold } from "app/models";
import { InterventionThresholdDialogComponent } from "./intervention-threshold-dialog/intervention-threshold-dialog.component";

@Component({
  selector: "app-intervention-thresholds",
  templateUrl: "./intervention-thresholds.component.html",
  styleUrls: ["./intervention-thresholds.component.scss"],
})
export class InterventionThresholdsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  readonly displayedColumns: (keyof InterventionThreshold | "moreOptions")[] = [
    "moreOptions",
    "grade",
    "numberOfRequirements",
    "minimumCommunicationLogs",
    "expectedCommunicationLogs",
    "minimumLiveLessons",
    "expectedLiveLessons",
    "minimumCourseHoursSpent",
  ];
  readonly dataSource = new MatTableDataSource();

  constructor(private adminService: AdminService, private dialog: MatDialog, private appComponent: AppComponent) {
    this.appComponent.isBusy = true;
  }

  ngOnInit() {
    this.loadDataTable();
  }

  loadDataTable() {
    this.adminService.returnInterventionThresholds().subscribe(items => {
      this.dataSource.data = items;
      this.dataSource.sortingDataAccessor = (item, property) => {
        // custom sort by grade
        if (property === "grade") {
          return item[property] === "K" ? 0 : Number(item[property]);
        }
        return item[property];
      };
      this.dataSource.sort = this.sort;
      this.appComponent.isBusy = false;
    });
  }

  updateInterventionThreshold(item: InterventionThreshold) {
    this.dialog
      .open(InterventionThresholdDialogComponent, {
        width: "800px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: item,
      })
      .beforeClosed()
      .subscribe(confirmationResult => {
        if (confirmationResult) {
          this.appComponent.isBusy = true;
          this.loadDataTable();
        }
      });
  }
}
