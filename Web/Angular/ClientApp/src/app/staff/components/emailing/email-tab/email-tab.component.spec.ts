import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { EmailTabComponent } from "./email-tab.component";

describe("EmailTabComponent", () => {
  let component: EmailTabComponent;
  let fixture: ComponentFixture<EmailTabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmailTabComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
