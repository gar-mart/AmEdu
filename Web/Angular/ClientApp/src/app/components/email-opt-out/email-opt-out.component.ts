import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-email-opt-out",
  templateUrl: "./email-opt-out.component.html",
  styleUrls: ["./email-opt-out.component.scss"],
})
export class EmailOptOutComponent {
  userUnsubscribed = false;
  userUnsubscribing = false;
  userUnsubscribedResult = false;
  studentGoogleId = "";

  constructor(private route: ActivatedRoute) {
    this.studentGoogleId = this.route.snapshot.params.studentGoogleId;
    if (!this.studentGoogleId) {
      location.href = "/";
    }
  }

  goHome() {
    location.href = "/";
  }
}
