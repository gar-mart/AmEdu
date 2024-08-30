import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { AppComponent } from "../../../../app.component";
import { CommunicationList, CommunicationListEntry } from "../../../../models";
import { Utility } from "../../../../shared";
import { StaffService } from "../../../services";
import { SaveListDialogComponent } from "../save-list-dialog/save-list-dialog.component";

@Component({
  selector: "app-communication-edit-tab",
  templateUrl: "./edit-recipients-tab.component.html",
  styleUrls: ["./edit-recipients-tab.component.scss"],
})
export class EditRecipientsTabComponent implements OnChanges, OnDestroy {
  @Input() includedEntries: CommunicationListEntry[];
  @Output() includeEntries = new EventEmitter<CommunicationListEntry[]>();
  @Output() removeEntries = new EventEmitter<CommunicationListEntry[]>();
  @Output() listAdded = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  readonly displayedHeaders = [
    "student",
    "grade",
    "school",
    "mentor",
    "guardian",
    "secondaryGuardian",
    "include",
    "remove",
  ];
  readonly displayedRows = [
    "student",
    "grade",
    "school",
    "mentor",
    "guardian",
    "secondaryGuardian",
    "includeStudent",
    "includeGuardian1",
    "includeGuardian2",
    "includeMentor",
  ];

  readonly displayedHeadersStaff = ["staff", "school", "include", "remove"];
  readonly displayedRowsStaff = ["staff", "school", "includeStaff"];

  private additionalRecipientId = -1;

  sendToStudentsFormControl = new UntypedFormControl();
  sendToGuardiansFormControl = new UntypedFormControl();
  sendToSecondaryGuardiansFormControl = new UntypedFormControl();
  sendToMentorsFormControl = new UntypedFormControl();
  sendToStaffFormControl = new UntypedFormControl();
  quickFilterFormControl = new UntypedFormControl();
  quickFilterStaffFormControl = new UntypedFormControl();

  dataSource: MatTableDataSource<CommunicationListEntry>;
  dataSourceStaff: MatTableDataSource<CommunicationListEntry>;

  showValidation = false;
  additionalRecipientEmailAddress: string;

  subscriptions: Subscription[] = [];

  get anySelected(): boolean {
    return this.dataSource.data.some(d => d.removeSelected);
  }

  get anySelectedStaff(): boolean {
    return this.dataSourceStaff.data.some(d => d.removeSelected);
  }

  get additionalRecipients(): CommunicationListEntry[] {
    return this.includedEntries.filter(x => x.additionalRecipientEmailAddress);
  }

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private appComponent: AppComponent,
    private staffService: StaffService
  ) {
    this.dataSource = new MatTableDataSource(this.includedEntries?.filter(x => !x.isStaff));
    this.dataSourceStaff = new MatTableDataSource(this.includedEntries?.filter(x => x.isStaff));
    this.dataSource.paginator = this.paginator;

    this.subscriptions.push(
      this.quickFilterFormControl.valueChanges.subscribe(value => {
        this.dataSource.filter = value;
      }),
      this.quickFilterStaffFormControl.valueChanges.subscribe(value => {
        this.dataSourceStaff.filter = value;
      }),
      this.sendToStaffFormControl.valueChanges.subscribe(value => {
        this.dataSourceStaff.data.forEach(d => (d.includeStaff = value));
      }),
      this.sendToStudentsFormControl.valueChanges.subscribe(value => {
        this.dataSource.data.forEach(d => (d.includeStudent = value));
      }),
      this.sendToGuardiansFormControl.valueChanges.subscribe((value: boolean) => {
        this.dataSource.data.forEach(d => (d.includeGuardian1 = value && !!d.guardianEmailAddress && !!d.guardianName));
      }),
      this.sendToSecondaryGuardiansFormControl.valueChanges.subscribe((value: boolean) => {
        this.dataSource.data.forEach(
          d => (d.includeGuardian2 = value && !!d.secondaryGuardianEmailAddress && !!d.secondaryGuardianName)
        );
      }),
      this.sendToMentorsFormControl.valueChanges.subscribe((value: boolean) => {
        this.dataSource.data.forEach(d => (d.includeMentor = value && !!d.mentorEmail && !!d.mentorName));
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const entries = changes["includedEntries"].currentValue;
    this.dataSource = new MatTableDataSource(entries?.filter(x => !x.additionalRecipientEmailAddress && !x.isStaff));
    this.dataSourceStaff = new MatTableDataSource(
      entries?.filter(x => !x.additionalRecipientEmailAddress && x.isStaff)
    );
    this.dataSource.filter = this.quickFilterFormControl.value;
    this.dataSource.paginator = this.paginator;

    if (
      this.sendToStudentsFormControl.value ||
      this.sendToGuardiansFormControl.value ||
      this.sendToSecondaryGuardiansFormControl.value ||
      this.sendToMentorsFormControl.value
    ) {
      this.dataSource.data.forEach(entry => {
        entry.includeStudent = this.sendToStudentsFormControl.value;
        entry.includeGuardian1 = this.sendToGuardiansFormControl.value;
        entry.includeGuardian2 = this.sendToSecondaryGuardiansFormControl.value;
        entry.includeMentor = this.sendToMentorsFormControl.value;
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  remove(entry: CommunicationListEntry) {
    this._removeEntries([entry]);
  }

  removeAll() {
    this._removeEntries(this.dataSource.data.filter(d => d.removeSelected));
  }
  removeAllStaff() {
    this._removeEntries(this.dataSourceStaff.data.filter(d => d.removeSelected));
  }

  _removeEntries(entries: CommunicationListEntry[]) {
    entries.forEach(entry => {
      // mark the internal state of the entry as not included
      entry.included =
        entry.includeSelected =
        entry.removeSelected =
        entry.includeGuardian1 =
        entry.includeGuardian2 =
        entry.includeMentor =
        entry.includeStudent =
          false;
    });
    this.removeEntries.emit(entries);
  }

  removeAdditionalRecipient(entry: CommunicationListEntry) {
    this.removeEntries.emit([entry]);
  }

  addAdditionalRecipient() {
    this.showValidation = !this.emailAddressIsValid(this.additionalRecipientEmailAddress);
    if (!this.showValidation) {
      const additionalRecipient: CommunicationListEntry = {
        included: true,
        additionalRecipientEmailAddress: this.additionalRecipientEmailAddress,
        userId: this.additionalRecipientId--,
        userName: "",
        userEmailAddress: "",
        isStaff: false,
      };

      this.includeEntries.emit([additionalRecipient]);

      this.additionalRecipientEmailAddress = null;
    }
  }

  toggleAllStudents(change: MatCheckboxChange) {
    this.dataSource.filteredData.forEach(entry => {
      entry.removeSelected = change.checked;
    });
  }
  toggleAllStaff(change: MatCheckboxChange) {
    this.dataSourceStaff.filteredData.forEach(entry => {
      entry.removeSelected = change.checked;
    });
  }

  saveList() {
    this.dialog
      .open(SaveListDialogComponent, {
        data: this.includedEntries,
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
      })
      .beforeClosed()
      .subscribe((list: CommunicationList) => {
        if (list) {
          this.appComponent.isBusy = true;
          this.staffService
            .saveCommunicationList(list)
            .subscribe(() => {
              this.snackBar.open(`Your list '${list.name}' was saved!`, "Close", { duration: 5000 });
              this.listAdded.emit();
            })
            .add(() => (this.appComponent.isBusy = false));
        }
      });
  }

  hasGuardian1(entry: CommunicationListEntry) {
    return entry.guardianName && entry.guardianEmailAddress;
  }

  hasGuardian2(entry: CommunicationListEntry) {
    return entry.secondaryGuardianName && entry.secondaryGuardianEmailAddress;
  }

  hasMentor(entry: CommunicationListEntry) {
    return entry.mentorName && entry.mentorEmail;
  }

  emailAddressIsValid(email: string) {
    return Utility.emailAddressIsValid(email);
  }
}
