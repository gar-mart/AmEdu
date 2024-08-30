import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { SaveListDialogComponent } from "./save-list-dialog.component";

describe("SaveListDialogComponent", () => {
  let component: SaveListDialogComponent;
  let fixture: ComponentFixture<SaveListDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SaveListDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
