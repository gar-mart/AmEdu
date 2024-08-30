import { AppEnvironment } from "app/enums/repository/app-environment.enum";
import { IEnvironment, defaultEnvironment } from "./environment.definition";

const productionEnvironment: Partial<IEnvironment> = {
  configuration: AppEnvironment.Production,
  storageUrl: "https://AmEduportal.blob.core.windows.net/public",
  appInsightsConfiguration: {
    connectionString:
      "InstrumentationKey=e7470cfd-8d78-4551-8660-794f0faca2d4;IngestionEndpoint=https://eastus-1.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/",
  },
};

export const environment: IEnvironment = Object.assign(defaultEnvironment, productionEnvironment);
