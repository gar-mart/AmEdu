import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EmailCommunicationDialogComponent } from "./email-communication-dialog.component";

describe("EmailCommunicationDialogComponent", () => {
  let component: EmailCommunicationDialogComponent;
  let fixture: ComponentFixture<EmailCommunicationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailCommunicationDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCommunicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
