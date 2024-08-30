import { Pipe, PipeTransform } from "@angular/core";
import { InterventionEmailTemplateFrom } from "app/enums/intervention-email-template-from.enum";

@Pipe({
  name: "from",
})
export class FromPipe implements PipeTransform {
  transform(value: InterventionEmailTemplateFrom): string {
    switch (value) {
      case InterventionEmailTemplateFrom.Counselor:
        return "Counselor";

      case InterventionEmailTemplateFrom.Mentor:
        return "Mentor";

      case InterventionEmailTemplateFrom.Truancy:
        return "Truancy@AmEduglobal.org";
    }

    return "unknown";
  }
}
