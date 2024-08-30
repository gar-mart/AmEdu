import { Component, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { AppComponent } from "../../../../../app.component";
import { PointsType } from "../../../../../enums";
import { Points } from "../../../../../models";
import { CashOutPointsItem } from "../../../../../models/cash-out-points-item.model";
import { StaffService } from "../../../../services";

@Component({
  selector: "app-cash-out-points-dialog",
  templateUrl: "./cash-out-points-dialog.component.html",
  styleUrls: ["./cash-out-points-dialog.component.scss"],
})
export class CashOutPointsDialogComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  readonly displayedColumns: string[] = ["studentName", "pointBalance", "cashOutAmount", "finalBalance"];
  loading = false;
  title = "Cash Out Points";
  dataSource = new MatTableDataSource<CashOutPointsItem>();
  reportItems: CashOutPointsItem[] = [];
  gradeLevelFilter = new UntypedFormControl();
  quickFilterFormControl = new UntypedFormControl();
  private readonly subscriptions: Subscription[] = [];

  constructor(
    private dialogRef: MatDialogRef<CashOutPointsDialogComponent>,
    public appComponent: AppComponent,
    public staffService: StaffService
  ) {}

  ngOnInit(): void {
    this.fetchData();

    this.subscriptions.push(
      this.quickFilterFormControl.valueChanges.subscribe(filter => (this.dataSource.filter = filter))
    ),
      this.gradeLevelFilter.valueChanges.pipe(debounceTime(500)).subscribe(() => this.fetchData());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  save(): void {
    const points = this.reportItems
      .filter(x => x.cashOutAmount > 0 && x.cashOutAmount <= x.pointBalance)
      .map<Points>(x => {
        return {
          userId: x.studentId,
          type: PointsType.Spend,
          value: x.cashOutAmount * -1,
        };
      });
    if (points.length > 0) {
      this.appComponent.isBusy = true;
      this.staffService.createPointsList(points).subscribe(result => {
        this.appComponent.isBusy = false;
        this.dialogRef.close(true);
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(true);
  }

  cashOutAll() {
    this.dataSource.data.forEach(d => (d.cashOutAmount = d.pointBalance));
  }

  cashOutStudent(row: CashOutPointsItem) {
    row.cashOutAmount = row.pointBalance;
  }

  private fetchData() {
    this.loading = true;
    this.appComponent.isBusy = true;

    this.dataSource.data = [];

    const gradeLevels = this.gradeLevelFilter.value ? this.gradeLevelFilter.value : [];
    this.staffService.returnPointBalances(gradeLevels).subscribe(reportItems => {
      reportItems = reportItems.filter(reportItem => reportItem.pointBalance > 0);

      this.reportItems = reportItems;
      this.dataSource.data = reportItems;
      this.dataSource.sort = this.sort;

      this.appComponent.isBusy = false;
      this.loading = false;
    });
  }
}
