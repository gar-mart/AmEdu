import { Component } from "@angular/core";
import { fadeInOut } from "../../services/animations/fade-in-out.animation";
import { BaseComponent } from "../base.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  animations: [fadeInOut],
})
export class HomeComponent extends BaseComponent {}
