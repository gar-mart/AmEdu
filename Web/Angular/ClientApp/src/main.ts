import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppEnvironment } from "app/enums/repository/app-environment.enum";
import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.configuration !== AppEnvironment.Development) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
