import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CommunityPassportFormsComponent } from "./community-passport-forms.component";

describe("CommunityPassportFormsComponent", () => {
  let component: CommunityPassportFormsComponent;
  let fixture: ComponentFixture<CommunityPassportFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityPassportFormsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityPassportFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
