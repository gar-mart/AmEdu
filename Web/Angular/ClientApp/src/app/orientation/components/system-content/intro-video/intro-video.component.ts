import { Component, Input, OnInit } from "@angular/core";
import { YouTubeVideoContent, YouTubeVideoContentModel } from "@models/step-content.model";
import { OrientationService } from "@services/orientation.service";
import { StepsByStudent } from "app/models";
import { AppComponent } from "../../../../app.component";

@Component({
  selector: "app-intro-video",
  templateUrl: "./intro-video.component.html",
  styleUrls: ["./intro-video.component.scss"],
})
export class IntroVideoComponent implements OnInit {
  @Input() editMode: boolean;
  @Input() previewMode: boolean;
  @Input() step: StepsByStudent;

  youTubeVideoContent: YouTubeVideoContent;
  loading = false;

  constructor(private orientationService: OrientationService, private appComponent: AppComponent) {}

  ngOnInit() {
    if (this.editMode) {
      return;
    }

    setTimeout(() => (this.loading = this.appComponent.isBusy = true));
    this.orientationService
      .getStepIntro(this.step?.userId ?? this.orientationService.user.userId)
      .subscribe(introStep => {
        // todo: when intro videos are saved using videoId only, we can change this code to set videoId = introStep.link only

        // for backwards compatibility, the video id may be saved in a link
        // 1. possibly as the last path value
        // 2. possibly the link itself is the video id

        let videoId = introStep.link.split("/").pop();

        if (!videoId) {
          videoId = introStep.link;
        }

        this.youTubeVideoContent = new YouTubeVideoContentModel({
          videoId,
        });
        this.loading = this.appComponent.isBusy = false;
      });
  }
}
