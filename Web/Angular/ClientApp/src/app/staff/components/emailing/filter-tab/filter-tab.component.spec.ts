import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { FilterTabComponent } from "./filter-tab.component";

describe("FilterTabComponent", () => {
  let component: FilterTabComponent;
  let fixture: ComponentFixture<FilterTabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterTabComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
