import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { YouTubePlayer } from "@angular/youtube-player";
import { YouTubeVideoContent } from "@models/step-content.model";
import { Constants } from "app/shared";
import { Subscription } from "rxjs";

@Component({
  selector: "app-you-tube-video-content",
  templateUrl: "./you-tube-video-content.component.html",
  styleUrls: ["./you-tube-video-content.component.scss"],
})
export class YouTubeVideoContentComponent implements OnInit, OnDestroy {
  @Input() content: YouTubeVideoContent;
  @Input() editMode: boolean;
  @Input() previewMode: boolean;
  @Output() edit = new EventEmitter<void>();

  readonly urlPrefix = Constants.youtubeUrlPrefix;

  urlControl = new UntypedFormControl();
  valueChanges$: Subscription;

  @ViewChild(YouTubePlayer) player: YouTubePlayer;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    if (this.editMode) {
      if (this.content?.videoId) {
        this.urlControl.setValue(`${this.urlPrefix}${this.content.videoId}`);
      }

      this.valueChanges$ = this.urlControl.valueChanges.subscribe(value => {
        try {
          this.content.videoId = new URL(value).searchParams.get("v");
          this.edit.emit();
        } catch (e) {
          console.error(e);
          this.content.videoId = "error";
          this.snackBar.open("YouTube video URL is in the wrong format.", "Dismiss", { duration: 5000 });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.valueChanges$?.unsubscribe();
  }

  onReady() {
    if (!this.editMode && !this.previewMode) {
      // Autoplay
      // undone: we are not doing autoplay right now because old orientation did not do so
      // this.player.playVideo();
    }
  }
}
