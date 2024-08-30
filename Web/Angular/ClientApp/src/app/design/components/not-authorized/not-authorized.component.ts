import { Component } from "@angular/core";
import { AuthService } from "@services/auth/auth.service";

@Component({
  selector: "app-not-authorized",
  templateUrl: "./not-authorized.component.html",
  styleUrls: ["./not-authorized.component.scss"],
})
export class NotAuthorizedComponent {
  userName: string;
  signedIn = true;

  constructor(private authService: AuthService) {
    try {
      this.userName = this.authService.currentUser?.email;
    } catch (e) {}

    if (!this.userName) {
      this.userName = "Not signed in.";
      this.signedIn = false;
    }
  }

  logout() {
    this.authService.signOut().subscribe();
    this.authService.redirectLogoutUser();
  }
}
