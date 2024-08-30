import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StudentsWithInterventionsComponent } from "./students-with-interventions.component";

describe("StudentsWithInterventionsComponent", () => {
  let component: StudentsWithInterventionsComponent;
  let fixture: ComponentFixture<StudentsWithInterventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsWithInterventionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsWithInterventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
