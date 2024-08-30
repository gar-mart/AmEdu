import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InterventionsStudentComponent } from "./interventions-student.component";

describe("InterventionsStudentComponent", () => {
  let component: InterventionsStudentComponent;
  let fixture: ComponentFixture<InterventionsStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionsStudentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
