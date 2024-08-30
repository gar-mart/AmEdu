import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { ConfirmationDialogComponent } from "../../../../design";
import { SchoolCell } from "../../../../enums";
import { CommunicationList, Staff } from "../../../../models";
import { StaffService } from "../../../services";
import { CommunicationFilter } from "./communication.filter";

@Component({
  selector: "app-communication-filter",
  templateUrl: "./communication-filter.component.html",
  styleUrls: ["./communication-filter.component.scss"],
})
export class CommunicationFilterComponent implements OnInit, OnDestroy {
  @Input() lists: CommunicationList[] = [];
  @Input() mentors: Staff[] = [];
  @Input() filter: UntypedFormGroup;
  @Output() serverFilter = new EventEmitter<CommunicationFilter>();
  @Output() quickFilter = new EventEmitter<string>();
  @Output() listDeleted = new EventEmitter<number>();

  readonly schools = [
    { value: SchoolCell.ElementarySchool, text: SchoolCell.ElementarySchool },
    { value: SchoolCell.MiddleSchool, text: SchoolCell.MiddleSchool },
    { value: SchoolCell.HighSchool, text: SchoolCell.HighSchool },
  ];
  readonly domains = [
    { value: "@AmEdu", text: "AmEdu" },
    { value: "@innocademy", text: "Innocademy" },
  ];

  quickFilterFormControl = new UntypedFormControl();

  subscriptions: Subscription[] = [];

  constructor(private staffService: StaffService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // clear filter controls when a list is selected
    this.subscriptions.push(
      this.filter.controls.list.valueChanges.subscribe(() => {
        this.handleNonListControl(control => control.patchValue(null, { emitEvent: false, onlySelf: true }));
      })
    );

    // clear list when any control is selected
    this.handleNonListControl(control =>
      this.subscriptions.push(
        control.valueChanges.subscribe(() => {
          this.filter.controls.list.patchValue(null, { emitEvent: false, onlySelf: true });
        })
      )
    );

    this.subscriptions.push(this.filter.valueChanges.subscribe(value => this.serverFilter.emit(value)));

    this.subscriptions.push(this.quickFilterFormControl.valueChanges.subscribe(value => this.quickFilter.emit(value)));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  clearList(event = null) {
    this.filter.controls.list.patchValue(null);
    if (event) {
      event.stopPropagation();
    }
  }

  deleteList(communicationList: CommunicationList) {
    if (communicationList?.id) {
      this.dialog
        .open(ConfirmationDialogComponent, {
          width: "500px",
          autoFocus: false,
          panelClass: ["rounded-dialog-window"],
          data: {
            confirmationMessage: `Are you sure you want to delete this list (${communicationList.name})? This cannot be undone.`,
          },
        })
        .beforeClosed()
        .pipe(
          filter(confirmationResult => confirmationResult),
          switchMap(() => this.staffService.deleteCommunicationList(communicationList.id))
        )
        .subscribe(() => {
          this.filter.controls.domain.patchValue(this.domains[0].value);
          this.listDeleted.emit(communicationList.id);
        });
    }
  }

  private handleNonListControl(action: Function) {
    Object.keys(this.filter.controls).forEach(key => {
      const control = this.filter.get(key);
      if (control !== this.filter.controls.list) {
        action(control);
      }
    });
  }
}
