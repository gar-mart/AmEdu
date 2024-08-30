import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EngagementMetricBreakdownDialogComponent } from "./engagement-metric-breakdown-dialog.component";

describe("EngagementMetricBreakdownDialogComponent", () => {
  let component: EngagementMetricBreakdownDialogComponent;
  let fixture: ComponentFixture<EngagementMetricBreakdownDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EngagementMetricBreakdownDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EngagementMetricBreakdownDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
