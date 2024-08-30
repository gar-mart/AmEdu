import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "@services/auth/auth.service";
import { AuthorizationService } from "@services/authorization.service";
import { EngagementFlag, Tab } from "app/models";
import { Utility } from "app/shared";
import { StaffService } from "../../services";
import { EngagementFlagNotificationDialogComponent } from "./engagement-flag-notification-dialog/engagement-flag-notification-dialog.component";

@Component({
  selector: "app-staff-main",
  templateUrl: "./staff-main.component.html",
  styleUrls: ["./staff-main.component.scss"],
})
export class StaffMainComponent implements OnInit {
  tabs: Tab[];
  engagementFlagNotifications: EngagementFlag[] = [];
  notificationRinging = false;

  constructor(
    private authService: AuthService,
    private authorizationService: AuthorizationService,
    private staffService: StaffService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.authorizationService
      .getUserByUserName(this.authService.currentUser.email)
      .subscribe(user => (this.tabs = Utility.getNavigationTabs(user)));
    this.staffService.returnEngagementFlagNotifications().subscribe(engagementFlagNotifications => {
      this.engagementFlagNotifications = engagementFlagNotifications;
      this.initNotificationAnimation(this);
    });
  }

  openEngagementFlagNotifications() {
    this.dialog.open(EngagementFlagNotificationDialogComponent, {
      autoFocus: false,
      panelClass: ["rounded-dialog-window"],
      data: this.engagementFlagNotifications,
    });
  }

  initNotificationAnimation(component: StaffMainComponent) {
    if (component.engagementFlagNotifications.length) {
      setInterval(() => (component.notificationRinging = !component.notificationRinging), 1000);
    }
  }
}
