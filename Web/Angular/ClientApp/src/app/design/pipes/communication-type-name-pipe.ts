import { Pipe, PipeTransform } from "@angular/core";
import { CommunicationType } from "../../enums";

@Pipe({
  name: "communicationTypeName",
})
export class CommunicationTypePipe implements PipeTransform {
  transform(communicationType: number | string): string {
    if (typeof communicationType === "string") {
      communicationType = CommunicationType[CommunicationType[communicationType]];
    }

    switch (communicationType) {
      case CommunicationType.IEPServiceTime:
        return "IEP Service Time";

      case CommunicationType.GoogleChat:
        return "Google Chat";

      case CommunicationType.GoogleMeet:
        return "Google Meet";

      case CommunicationType.InPerson:
        return "In Person";

      default:
        return CommunicationType[communicationType];
    }
  }
}
