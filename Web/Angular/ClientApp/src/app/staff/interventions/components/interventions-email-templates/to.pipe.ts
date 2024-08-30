import { Pipe, PipeTransform } from "@angular/core";
import { InterventionEmailTemplateTo } from "app/enums/intervention-email-template-to.enum";

@Pipe({
  name: "to",
})
export class ToPipe implements PipeTransform {
  transform(value: InterventionEmailTemplateTo): string {
    return [
      this.getValue(value & InterventionEmailTemplateTo.Mentor),
      this.getValue(value & InterventionEmailTemplateTo.SecondaryMentor),
      this.getValue(value & InterventionEmailTemplateTo.Counselor),
      this.getValue(value & InterventionEmailTemplateTo.Interventionist),
      this.getValue(value & InterventionEmailTemplateTo.Guardian1),
      this.getValue(value & InterventionEmailTemplateTo.Guardian2),
      this.getValue(value & InterventionEmailTemplateTo.Student),
    ]
      .filter(x => x)
      .join(", ");
  }

  private getValue(value: InterventionEmailTemplateTo) {
    switch (value) {
      case InterventionEmailTemplateTo.Mentor:
        return "Mentor";

      case InterventionEmailTemplateTo.SecondaryMentor:
        return "Secondary Mentor";

      case InterventionEmailTemplateTo.Counselor:
        return "Counselor";

      case InterventionEmailTemplateTo.Guardian1:
        return "Guardian 1";

      case InterventionEmailTemplateTo.Guardian2:
        return "Guardian 2";

      case InterventionEmailTemplateTo.Student:
        return "Student";

      case InterventionEmailTemplateTo.Interventionist:
        return "Interventionist";

      default:
        return null;
    }
  }
}
