import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InterventionsEmailTemplatesComponent } from "./interventions-email-templates.component";

describe("InterventionsEmailTemplatesComponent", () => {
  let component: InterventionsEmailTemplatesComponent;
  let fixture: ComponentFixture<InterventionsEmailTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionsEmailTemplatesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionsEmailTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
