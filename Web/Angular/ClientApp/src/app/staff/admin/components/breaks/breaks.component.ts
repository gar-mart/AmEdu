import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AdminService } from "@services/admin.service";
import { ConfirmationDialogComponent } from "app/design";
import { Break } from "app/models";
import { Subscription } from "rxjs";
import { AppComponent } from "../../../../app.component";
import { CommonService } from "../../../../services";

@Component({
  selector: "app-breaks",
  templateUrl: "./breaks.component.html",
  styleUrls: ["./breaks.component.scss"],
})
export class BreaksComponent implements OnInit, OnDestroy {
  @ViewChild("formDirective") private formDirective: NgForm;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  readonly minDate = new Date("2020-1-1");
  readonly maxDate = new Date("2050-12-31");
  readonly displayedColumns: string[] = ["moreOptions", "name", "startDate", "endDate"];

  dataSource = new MatTableDataSource();
  filter: string;
  breakForm: UntypedFormGroup;
  years: number[] = [];
  yearFilter = new UntypedFormControl();
  selectedYear = new Date().getFullYear();
  saving = false;

  subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private commonService: CommonService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private appComponent: AppComponent,
    private formBuilder: UntypedFormBuilder
  ) {
    this.appComponent.isBusy = true;
    this.maxDate.setFullYear(new Date().getFullYear() + 50);
    this.initializeFormGroup();

    for (let year = 2020; year <= 2120; year++) {
      this.years.push(year);
    }

    this.yearFilter.patchValue(this.selectedYear);

    this.subscriptions.push(
      this.yearFilter.valueChanges.subscribe(year => {
        this.selectedYear = year;
        this.loadDatatable();
      })
    );
  }

  ngOnInit() {
    this.loadDatatable();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  loadDatatable() {
    const selectedYear = this.selectedYear;
    this.adminService.returnBreaks(selectedYear).subscribe(breaks => {
      if (!breaks.length) {
        this.snackBar.open("No breaks found in " + selectedYear, "Close", { panelClass: "success", duration: 5000 });
      }

      this.dataSource = new MatTableDataSource(breaks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filter = this.filter;
      this.appComponent.isBusy = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filter = this.dataSource.filter;
  }

  addBreak() {
    if (this.saving) {
      return;
    }

    if (this.breakForm.valid) {
      this.saving = true;
      this.appComponent.isBusy = true;

      const newBreak: Break = this.breakForm.value;

      this.adminService.createBreak(newBreak).subscribe(result => {
        if (result <= 0) {
          this.saving = false;
          this.appComponent.isBusy = false;
          this.snackBar.open("Failed to create break", "Close", { panelClass: "success", duration: 3500 });
        } else {
          this.formDirective.resetForm();
          this.saving = false;
          this.loadDatatable();
        }
      });
    }
  }

  deleteBreak(id) {
    this.appComponent.isBusy = true;
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: {
          confirmationMessage: "Are you sure you want to delete this break? This cannot be undone.",
        },
      })
      .beforeClosed()
      .subscribe(confirmationResult => {
        if (confirmationResult) {
          this.adminService.deleteBreak(id).subscribe(result => {
            if (result) {
              this.loadDatatable();
            } else {
              this.snackBar.open("Failed to delete break", "Close", { panelClass: "success", duration: 3500 });
              this.appComponent.isBusy = false;
            }
          });
        } else {
          this.appComponent.isBusy = false;
        }
      });
  }

  setAdmin(userId: number, isAdmin: boolean) {
    this.appComponent.isBusy = true;
    this.commonService.setAdmin(userId, isAdmin).subscribe(result => {
      if (!result) {
        this.snackBar.open("Failed to update admin", "Close", { panelClass: "success", duration: 3500 });
      }
      this.appComponent.isBusy = false;
    });
  }

  setTeacher(userId: number, isTeacher: boolean) {
    this.appComponent.isBusy = true;
    this.commonService.setTeacher(userId, isTeacher).subscribe(result => {
      if (!result) {
        this.snackBar.open("Failed to update teacher", "Close", { panelClass: "success", duration: 3500 });
      }
      this.appComponent.isBusy = false;
    });
  }

  private initializeFormGroup() {
    this.breakForm = this.formBuilder.group({
      name: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });

    const startDate = this.breakForm.controls["startDate"];
    const endDate = this.breakForm.controls["endDate"];

    this.subscriptions.push(
      startDate.valueChanges.subscribe(value => {
        if ((!endDate.value || endDate.value < value) && value !== null) {
          endDate.patchValue(value);
        }
      })
    );

    this.subscriptions.push(
      endDate.valueChanges.subscribe(value => {
        if ((!startDate.value || startDate.value > value) && value !== null) {
          startDate.patchValue(value);
        }
      })
    );
  }
}
