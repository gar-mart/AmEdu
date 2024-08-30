import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { CommunicationList, CommunicationListEntry, Staff } from "../../../../models";
import { StaffService } from "../../../services";
import { CommunicationFilterComponent } from "../communication-filter/communication-filter.component";
import { CommunicationFilter } from "../communication-filter/communication.filter";

@Component({
  selector: "app-communication-filter-tab",
  templateUrl: "./filter-tab.component.html",
  styleUrls: ["./filter-tab.component.scss"],
})
export class FilterTabComponent implements OnInit {
  @Input() lists: CommunicationList[] = [];
  @Input() mentors: Staff[] = [];
  @Input() includedEntries: CommunicationListEntry[];
  @Output() includeEntries = new EventEmitter<CommunicationListEntry[]>();
  @Output() listDeleted = new EventEmitter<number>();

  @ViewChild(CommunicationFilterComponent) filterComponent: CommunicationFilterComponent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("paginatorStaff") paginatorStaff: MatPaginator;

  allStudentsToggled = false;
  allStaffToggled = false;

  filterGroup: UntypedFormGroup;

  isFiltering = true;
  displayedColumns = ["student", "grade", "school", "mentor", "include"];
  displayedColumnsStaff = ["staff", "school", "include"];
  dataSource = new MatTableDataSource<CommunicationListEntry>();
  dataSourceStaff = new MatTableDataSource<CommunicationListEntry>();
  quickFilter: string = null;
  quickFilterStaff: string = null;
  domains = [
    { value: "@AmEdu", text: "AmEdu" },
    { value: "@innocademy", text: "Innocademy" },
  ];

  get anySelected(): boolean {
    return this.dataSource.data.some(d => d.includeSelected && !d.included);
  }

  get anySelectedStaff(): boolean {
    return this.dataSourceStaff.data.some(d => d.includeSelected && !d.included);
  }

  constructor(private staffService: StaffService, private formBuilder: UntypedFormBuilder) {}

  ngOnInit() {
    this.filterGroup = this.defaultFilter();
    this.filter(this.filterGroup.value);
  }

  filter(filter: CommunicationFilter) {
    this.allStudentsToggled = false;
    this.allStaffToggled = false;
    this.isFiltering = true;
    this.dataSource = new MatTableDataSource();
    this.dataSource.filter = this.quickFilter;
    this.dataSource.paginator = this.paginator;
    this.dataSourceStaff.paginator = this.paginatorStaff;
    this.dataSourceStaff.filter = this.quickFilterStaff;
    this.dataSourceStaff = new MatTableDataSource();

    this.staffService.returnPotentialCommunicationListEntries(filter).subscribe(entries => {
      this.isFiltering = false;

      // map server entries onto included client entries
      let matches = 0;
      for (let j = 0; j < entries.length; j++) {
        if (matches === this.includedEntries.length) {
          break; // break early if we can
        }

        for (let i = 0; i < this.includedEntries.length; i++) {
          if (this.includedEntries[i].userId === entries[j].userId) {
            matches++;
            entries[j] = this.includedEntries[i];
            break;
          }
        }
      }
      this.dataSource = new MatTableDataSource(entries.filter(x => !x.isStaff));
      this.dataSourceStaff = new MatTableDataSource(entries.filter(x => x.isStaff));
      this.dataSource.filter = this.quickFilter;
      this.dataSourceStaff.filter = this.quickFilterStaff;
      this.dataSource.paginator = this.paginator;
      this.dataSourceStaff.paginator = this.paginatorStaff;
    });
  }

  toggleAllStudents(change: MatCheckboxChange) {
    this.dataSource.filteredData.forEach(entry => {
      if (!entry.included) {
        entry.includeSelected = change.checked;
      }
    });
  }

  toggleAllStaff(change: MatCheckboxChange) {
    this.dataSourceStaff.filteredData.forEach(entry => {
      if (!entry.included) {
        entry.includeSelected = change.checked;
      }
    });
  }

  includeEntry(entry: CommunicationListEntry) {
    this.include([entry]);
  }

  includeAllStudents() {
    this.include(this.dataSource.data);
  }

  includeAllStaff() {
    this.include(this.dataSourceStaff.data);
  }

  emitListDeleted(event) {
    this.listDeleted.emit(event);
  }

  onQuickFilter(filter: string) {
    this.dataSource.filter = filter;
    this.quickFilter = filter;
  }

  onQuickFilterStaff(filter: string) {
    this.dataSourceStaff.filter = filter;
    this.quickFilterStaff = filter;
  }

  private include(entries: CommunicationListEntry[]) {
    const validEntries = entries.filter(entry => {
      if (entry.included) {
        return false; // already included
      }

      if (entry.includeSelected) {
        entry.included = true;
      }
      return entry.included;
    });

    this.includeEntries.emit(validEntries);
  }

  private defaultFilter() {
    return this.formBuilder.group({
      list: [null],
      mentor: [
        this.staffService.user.isMentor ? this.mentors.filter(s => s.id === this.staffService.user.userId)[0] : null,
      ], // let the user be the default mentor filter
      grades: [[]],
      domain: [this.domains[0].value], // let AmEdu be the default selected option
    });
  }
}
