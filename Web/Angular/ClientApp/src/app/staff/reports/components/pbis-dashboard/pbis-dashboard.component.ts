import { Component, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Subscription } from "rxjs";
import { Staff } from "../../../../models";
import { CommonService } from "../../../../services";
import { Utility } from "../../../../shared";

import { MatDialog } from "@angular/material/dialog";
import { AppComponent } from "../../../../app.component";
import { CashOutPointsDialogComponent } from "./cash-out-points-dialog/cash-out-points-dialog.component";

@Component({
  selector: "app-pbis-dashboard",
  templateUrl: "./pbis-dashboard.component.html",
  styleUrls: ["./pbis-dashboard.component.scss"],
})
export class PbisDashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private readonly subscriptions: Subscription[] = [];

  readonly chartGrouping: string[] = ["Grade Level", "Cell", "Mentor"];

  hideGradeLevelFilter = false;
  mentors: Staff[] = [];

  schoolFilter = new UntypedFormControl();
  gradeLevelFilter = new UntypedFormControl();
  chartGroupingFilter = new UntypedFormControl();
  mentorFilter = new UntypedFormControl();
  startDateFilter = new UntypedFormControl();
  endDateFilter = new UntypedFormControl();
  constructor(private appComponent: AppComponent, private commonService: CommonService, private dialog: MatDialog) {}

  cashOutPoints(): void {
    this.dialog
      .open(CashOutPointsDialogComponent, {
        width: "80%",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: null,
      })
      .beforeClosed()
      .subscribe(spentPoints => {
        this.appComponent.isBusy = false;
      });
  }

  ngOnInit(): void {
    // set default filter values
    this.schoolFilter.patchValue("AmEdustudents.org");
    let startOfYear = Utility.getBeginningOfSchoolYear();
    this.startDateFilter.patchValue(startOfYear);
    this.endDateFilter.patchValue(new Date());

    this.subscriptions.push(
      this.chartGroupingFilter.valueChanges.subscribe(val => {
        if (val === "Cell") {
          this.hideGradeLevelFilter = true;
          this.gradeLevelFilter.setValue([]);
        } else {
          this.hideGradeLevelFilter = false;
        }
      })
    );

    this.chartGroupingFilter.patchValue("Grade Level");
    this.commonService.getMentors().subscribe(result => {
      this.mentors = result;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
