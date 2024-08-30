import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { SaveEmailTemplateDialogComponent } from "./save-email-template-dialog.component";

describe("SaveEmailTemplateDialogComponent", () => {
  let component: SaveEmailTemplateDialogComponent;
  let fixture: ComponentFixture<SaveEmailTemplateDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SaveEmailTemplateDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveEmailTemplateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
