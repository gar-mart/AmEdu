import { Component, Input } from "@angular/core";
import { StudentResource } from "@models/student-resource.model";

@Component({
  selector: "app-student-resource-tile",
  templateUrl: "./student-resource-tile.component.html",
  styleUrls: ["./student-resource-tile.component.scss"],
})
export class StudentResourceTileComponent {
  @Input() studentResource: StudentResource;

  openURL(url: string) {
    window.open(url);
  }
}
