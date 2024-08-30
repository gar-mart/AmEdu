import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { StudentIntervention } from "@models/student-intervention.model";
import { InterventionService } from "app/staff/interventions/interventions.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-students-with-interventions",
  templateUrl: "./students-with-interventions.component.html",
  styleUrls: ["./students-with-interventions.component.scss"],
})
export class StudentsWithInterventionsComponent implements AfterViewInit, OnChanges {
  @Input() schoolYear: number;
  @Input() grades: string[];
  @Input() enrollmentStatus: boolean;
  @Input() set filter(value: string) {
    this.dataSource.filter = value;
  }

  @ViewChild(MatSort) sort: MatSort;

  readonly displayedColumns: string[] = ["student", "gradeLevel", "mentor", "level1", "level2", "level3", "level4"];

  loading = true;
  dataSource = new MatTableDataSource();
  studentInterventions: StudentIntervention[];

  constructor(private interventionService: InterventionService) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.schoolYear?.currentValue !== changes.schoolYear?.previousValue ||
      changes.enrollmentStatus?.currentValue !== changes.enrollmentStatus?.previousValue
    ) {
      setTimeout(() => (this.loading = true));
      this.interventionService
        .getInterventionLevelsBySearch(this.schoolYear, this.enrollmentStatus)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe(result => {
          this.studentInterventions = result;
          this.filterTable();
        });
    } else {
      this.filterTable();
    }
  }

  filterTable() {
    this.dataSource.data = this.studentInterventions.filter(x => {
      return !this.grades || !this.grades.length || this.grades.map(g => (g === "K" ? 0 : +g)).includes(x.gradeLevel);
    });
  }
}
