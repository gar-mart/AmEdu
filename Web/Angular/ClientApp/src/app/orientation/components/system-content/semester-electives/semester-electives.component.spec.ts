import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SemesterElectivesComponent } from "./semester-electives.component";

describe("SemesterElectivesComponent", () => {
  let component: SemesterElectivesComponent;
  let fixture: ComponentFixture<SemesterElectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SemesterElectivesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterElectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
