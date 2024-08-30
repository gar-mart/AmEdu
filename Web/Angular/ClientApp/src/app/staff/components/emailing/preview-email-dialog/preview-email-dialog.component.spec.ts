import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { PreviewEmailDialogComponent } from "./preview-email-dialog.component";

describe("PreviewEmailDialogComponent", () => {
  let component: PreviewEmailDialogComponent;
  let fixture: ComponentFixture<PreviewEmailDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewEmailDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
