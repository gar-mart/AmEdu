import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { EditRecipientsTabComponent } from "./edit-recipients-tab.component";

describe("EditRecipientsTabComponent", () => {
  let component: EditRecipientsTabComponent;
  let fixture: ComponentFixture<EditRecipientsTabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditRecipientsTabComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecipientsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
