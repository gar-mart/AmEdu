import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InterventionDetailsDialogComponent } from "./intervention-details-dialog.component";

describe("InterventionDetailsDialogComponent", () => {
  let component: InterventionDetailsDialogComponent;
  let fixture: ComponentFixture<InterventionDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionDetailsDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
