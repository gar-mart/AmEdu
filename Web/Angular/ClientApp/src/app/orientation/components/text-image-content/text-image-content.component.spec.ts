import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TextImageContentComponent } from "./text-image-content.component";

describe("TextImageContentComponent", () => {
  let component: TextImageContentComponent;
  let fixture: ComponentFixture<TextImageContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextImageContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextImageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
