import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EnrollmentReportStudentAutocompleteComponent } from "./enrollment-report-student-autocomplete.component";

describe("EnrollmentReportStudentAutocompleteComponent", () => {
  let component: EnrollmentReportStudentAutocompleteComponent;
  let fixture: ComponentFixture<EnrollmentReportStudentAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollmentReportStudentAutocompleteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentReportStudentAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
