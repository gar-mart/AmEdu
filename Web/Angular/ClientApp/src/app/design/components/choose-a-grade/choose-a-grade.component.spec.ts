import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ChooseAGradeComponent } from "./choose-a-grade.component";

describe("ChooseAGradeComponent", () => {
  let component: ChooseAGradeComponent;
  let fixture: ComponentFixture<ChooseAGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseAGradeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
