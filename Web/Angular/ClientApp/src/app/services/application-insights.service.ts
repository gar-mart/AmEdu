import { Injectable } from "@angular/core";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApplicationInsightsService {
  appInsights: ApplicationInsights;

  constructor() {
    this.appInsights = new ApplicationInsights({ config: environment.appInsightsConfiguration });
    this.appInsights.loadAppInsights();
  }
}
