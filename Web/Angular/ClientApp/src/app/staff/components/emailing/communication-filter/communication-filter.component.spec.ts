import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CommunicationFilterComponent } from "./communication-filter.component";

describe("CommunicationFilterComponent", () => {
  let component: CommunicationFilterComponent;
  let fixture: ComponentFixture<CommunicationFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunicationFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
