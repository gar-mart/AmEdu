import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "@design/confirmation-dialog/confirmation-dialog.component";
import { Elective } from "@models/elective";
import { ElectiveGroup } from "@models/elective-group";
import { ElectiveGroupChoice } from "@models/elective-group-choice";
import { AdminService } from "@services/admin.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-elective-group-choice",
  templateUrl: "./elective-group-choice.component.html",
  styleUrls: ["./elective-group-choice.component.scss"],
})
export class ElectiveGroupChoiceComponent implements OnInit, OnDestroy {
  @Input() group: ElectiveGroup;
  @Input() electives: Elective[];
  @Output() loadDataTable = new EventEmitter();

  readonly displayedColumnsElectiveGroups: string[] = ["moreOptions", "course", "gradeLevels"];

  filterElective: Elective[];
  electiveFilter = new UntypedFormControl();
  numberOfRequiredCourses = new UntypedFormControl("", [Validators.required, Validators.min(0)]);
  form: UntypedFormGroup;

  subscriptions: Subscription[] = [];

  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit() {
    this.subscriptions.push(
      this.electiveFilter.valueChanges.subscribe(val => {
        if (val && val.id) {
          const electiveGroupChoice: ElectiveGroupChoice = {
            electiveGroupId: this.group.id,
            electiveId: val.id,
          };

          this.adminService.createElectiveGroupChoice(electiveGroupChoice).subscribe(r => {
            if (r) {
              this.loadDataTable.emit();
            }
          });
        } else {
          //Filter based on ElectiveGroup semester, already selected options & passed in query string.
          this.filterElective = this.electives.filter(
            x =>
              x.name.toLowerCase().includes(val.toLowerCase()) &&
              x.semesterElectives.some(i => i.semester === this.group.semester)
          );

          //already selected options
          this.filterElective = this.filterElective.filter(dbElective => {
            let existingIds = this.group.electiveGroupChoices.map(x => x.electiveId);
            return !existingIds.includes(dbElective.id);
          });
        }
      })
    );

    this.numberOfRequiredCourses.setValue(this.group.numberOfRequiredChoices);

    this.subscriptions.push(
      this.numberOfRequiredCourses.valueChanges.subscribe(() => {
        if (this.numberOfRequiredCourses.valid) {
          this.group.numberOfRequiredChoices = this.numberOfRequiredCourses.value;
          this.adminService.updateElectiveGroup(this.group).subscribe(r => {
            if (r) {
              this.loadDataTable.emit();
            }
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  displayElectiveChoice() {
    return "";
  }

  getErrorMessage() {
    if (this.numberOfRequiredCourses.hasError("required")) {
      return "You must enter a value";
    }

    return this.numberOfRequiredCourses.hasError("min") ? "Number must be positive." : "";
  }

  deleteElectiveGroupChoice(row: ElectiveGroupChoice) {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: {
          confirmationMessage: "Are you sure you want to delete this elective group choice? This cannot be undone.",
        },
      })
      .beforeClosed()
      .subscribe(confirmationResult => {
        if (confirmationResult) {
          this.adminService.deleteElectiveGroupChoice(row).subscribe(result => {
            if (result) {
              this.dialog.closeAll();
              this.loadDataTable.emit();
            }
          });
        }
      });
  }

  deleteElectiveGroup(group: ElectiveGroup) {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: {
          confirmationMessage: "Are you sure you want to delete this elective group? This cannot be undone.",
        },
      })
      .beforeClosed()
      .subscribe(confirmationResult => {
        if (confirmationResult) {
          this.adminService.deleteElectiveGroup(group).subscribe(result => {
            if (result) {
              this.dialog.closeAll();
              this.loadDataTable.emit();
            }
          });
        }
      });
  }
}
