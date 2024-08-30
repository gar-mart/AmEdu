import { Component, Input } from "@angular/core";
import { AppTileMetadata } from "@models/app-tile-metadata.model";

@Component({
  selector: "app-shortcut-tile",
  templateUrl: "./shortcut-tile.component.html",
  styleUrls: ["./shortcut-tile.component.scss"],
})
export class ShortcutTileComponent {
  @Input() appShortcut: AppTileMetadata;

  constructor() {}

  openURL(url: string) {
    window.open(url);
  }
}
