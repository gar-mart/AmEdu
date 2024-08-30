import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { ActivatedRoute } from "@angular/router";
import { Intervention } from "@models/intervention.model";
import { Student } from "@models/student.model";
import { InterventionStatus } from "app/enums/intervention-status.enum";
import { Subscription } from "rxjs";
import { InterventionService } from "../../interventions.service";

const studentIdQueryParam = "studentId";
const schoolYearQueryParam = "schoolYear";

@Component({
  selector: "app-interventions-student",
  templateUrl: "./interventions-student.component.html",
  styleUrls: ["./interventions-student.component.scss"],
})
export class InterventionsStudentComponent implements OnInit, OnDestroy {
  @ViewChild("stepper") stepper: MatStepper;

  private readonly subscriptions: Subscription[] = [];

  allStudents: Student[];
  filterStudents: Student[];
  student = new UntypedFormControl();
  schoolYear = new UntypedFormControl();
  schoolYears: number[];

  interventions: Intervention[] = null;
  hideStepper = true;

  get selectedIndex() {
    return Math.max(
      this.interventions.findIndex(intervention => !intervention.logOnly),
      0
    );
  }

  /** Staff may edit this page if they are an interventionist, an admin, the student's mentor, or a counselor (for the student's grade level) */
  get canEdit() {
    const student: Student = this.student.value;
    return (
      this.interventionService.user.isInterventionist ||
      this.interventionService.user.isAdmin ||
      this.interventionService.user.userId === student?.mentorId ||
      this.interventionService.user.counselorAssignments.includes(student?.gradeLevel ?? "0")
    );
  }

  constructor(private route: ActivatedRoute, private interventionService: InterventionService) {}

  ngOnInit(): void {
    const studentId = +this.route.snapshot.queryParamMap.get(studentIdQueryParam);
    const schoolYear = +this.route.snapshot.queryParamMap.get(schoolYearQueryParam);
    this.interventionService.getStudentsWithInterventions(studentId).subscribe(results => {
      this.allStudents = results;

      const selectedStudent = (studentId ? results.find(s => s.id === studentId) : null) ?? results[0];
      this.student.patchValue(selectedStudent);
    });

    this.schoolYears = this.buildSchoolYears();
    if (schoolYear >= this.schoolYears[0]) {
      this.schoolYear.patchValue(schoolYear);
    }

    this.subscriptions.push(
      this.student.valueChanges.subscribe((student: Student | string) => {
        if (typeof student !== "string") {
          const searchParams = new URLSearchParams(location.search);
          searchParams.set(studentIdQueryParam, student.id.toString());
          history.replaceState(null, null, location.pathname + "?" + searchParams.toString());
          this.loadInterventions();
        } else {
          this.filterStudents = this.allStudents.filter(x => x.name.toLowerCase().includes(student.toLowerCase()));
        }
      }),

      this.schoolYear.valueChanges.subscribe(value => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(schoolYearQueryParam, value.toString());
        history.replaceState(null, null, location.pathname + "?" + searchParams.toString());
        this.loadInterventions();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  loadInterventions() {
    const student: Student = this.student.value;
    const schoolYear: number = this.schoolYear.value;

    // load
    this.interventions = null;
    this.interventionService.getInterventionsBySearch(schoolYear, student.id).subscribe(result => {
      this.interventions = result;
    });
  }

  enforceStudentSelection() {
    if (!this.student.value?.id) {
      this.student.patchValue(this.filterStudents[0] || this.allStudents[0]);
    }
  }

  studentDisplay(student: Student) {
    return student.name;
  }

  showIntervention(intervention: Intervention) {
    return intervention.status !== InterventionStatus.Voided;
  }

  private buildSchoolYears(): number[] {
    const now = new Date();
    const currentSchoolYear = now.getMonth() < 6 ? now.getFullYear() - 1 : now.getFullYear();

    const schoolYears = [Math.min(currentSchoolYear, 2021)];

    while (schoolYears[schoolYears.length - 1] < currentSchoolYear) {
      schoolYears.push(schoolYears[schoolYears.length - 1] + 1);
    }

    this.schoolYear.patchValue(currentSchoolYear);

    return schoolYears;
  }
}
