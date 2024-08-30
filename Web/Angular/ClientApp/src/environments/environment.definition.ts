import { IConfig, IConfiguration } from "@microsoft/applicationinsights-web";
import { AppEnvironment } from "../app/enums/repository/app-environment.enum";

export abstract class IEnvironment {
  configuration: AppEnvironment;
  baseUrl: string;
  apiUrl: string;
  cacheLocation: string;
  expireOffsetSeconds: number;
  inboxUrl: string;
  microsoftInboxUrl: string; // todo: remove this once AmEdu fully transitions to Google
  chatUrl: string;
  storageUrl: string;
  appInsightsConfiguration: IConfiguration & IConfig;
}

export const defaultEnvironment: IEnvironment = {
  configuration: AppEnvironment.Development,
  baseUrl: null, // Change this to the address of your backend API if different from frontend address
  apiUrl: "/api",
  cacheLocation: "localStorage",
  expireOffsetSeconds: 600,
  inboxUrl: "https://gmail.com",
  microsoftInboxUrl: "https://outlook.office.com/mail/inbox",
  chatUrl: "https://chat.google.com",
  storageUrl: "https://AmEduportaldev.blob.core.windows.net/public",
  appInsightsConfiguration: {
    connectionString:
      "InstrumentationKey=4634f8a2-a593-49ee-88ff-917dac49a037;IngestionEndpoint=https://eastus-2.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/",
    enableAutoRouteTracking: true,
  },
};
