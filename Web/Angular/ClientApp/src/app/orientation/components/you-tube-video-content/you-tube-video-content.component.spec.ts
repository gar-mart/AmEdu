import { ComponentFixture, TestBed } from "@angular/core/testing";

import { YouTubeVideoContentComponent } from "./you-tube-video-content.component";

describe("YouTubeVideoContentComponent", () => {
  let component: YouTubeVideoContentComponent;
  let fixture: ComponentFixture<YouTubeVideoContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YouTubeVideoContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YouTubeVideoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
