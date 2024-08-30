import { Component } from "@angular/core";
import { fadeInOut } from "../../services/animations/fade-in-out.animation";
import { FdRouterService } from "../../services/fd-router.service";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.scss"],
  animations: [fadeInOut],
})
export class NotFoundComponent {
  get previousUrl() {
    // allow user to go to "previous page" only if one exists and it isn't the home page.
    return this.fdRouterService.previousUrl && this.fdRouterService.previousUrl !== "/"
      ? this.fdRouterService.previousUrl
      : undefined;
  }

  constructor(private fdRouterService: FdRouterService) {}
}
