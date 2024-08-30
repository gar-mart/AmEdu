import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InterventionsReportComponent } from "./interventions-report.component";

describe("InterventionsReportComponent", () => {
  let component: InterventionsReportComponent;
  let fixture: ComponentFixture<InterventionsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionsReportComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
