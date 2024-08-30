import { Component, Input } from "@angular/core";
import { User } from "@models/user.model";

@Component({
  selector: "app-contact-content-tile",
  templateUrl: "./contact-content-tile.component.html",
  styleUrls: ["./contact-content-tile.component.scss"],
})
export class ContactContentTileComponent {
  @Input() user: User;
}
