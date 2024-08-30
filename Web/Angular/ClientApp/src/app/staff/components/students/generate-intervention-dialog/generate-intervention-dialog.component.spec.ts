import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GenerateInterventionDialogComponent } from "./generate-intervention-dialog.component";

describe("GenerateInterventionDialogComponent", () => {
  let component: GenerateInterventionDialogComponent;
  let fixture: ComponentFixture<GenerateInterventionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateInterventionDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateInterventionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
