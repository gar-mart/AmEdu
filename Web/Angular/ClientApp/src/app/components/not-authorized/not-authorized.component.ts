import { Component } from "@angular/core";
import { fadeInOut } from "../../services/animations/fade-in-out.animation";
import { FdRouterService } from "../../services/fd-router.service";

@Component({
  selector: "app-not-authorized",
  templateUrl: "./not-authorized.component.html",
  styleUrls: ["./not-authorized.component.scss"],
  animations: [fadeInOut],
})
export class NotAuthorizedComponent {
  get previousUrl() {
    // allow user to go to "previous page" only if one exists and it isn't the home page.
    return this.fdRouterService.previousUrl && this.fdRouterService.previousUrl !== "/"
      ? this.fdRouterService.previousUrl
      : undefined;
  }

  constructor(private fdRouterService: FdRouterService) {}
}
