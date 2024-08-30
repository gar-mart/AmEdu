import { Component, Input } from "@angular/core";

@Component({
  selector: "app-youtube-video",
  template: `
    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
      <iframe
        [width]="width"
        [height]="height"
        [src]="embeddedLink | safe"
        allowfullscreen
        style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe>
    </div>
  `,
})
export class YoutubeVideoComponent {
  @Input() embeddedLink: string;
  @Input() width? = 1280;
  @Input() height? = 720;
}
