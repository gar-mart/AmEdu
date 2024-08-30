import { Pipe, PipeTransform } from "@angular/core";
import { InterventionLevel } from "app/enums/intervention-level.enum";

@Pipe({
  name: "owner",
})
export class OwnerPipe implements PipeTransform {
  transform(level: InterventionLevel): string {
    switch (level) {
      case InterventionLevel.Warning:
      case InterventionLevel.Level1:
        return "Mentor";

      case InterventionLevel.Level2:
        return "Counselor & Interventionist";

      case InterventionLevel.Level3:
      case InterventionLevel.Level4:
        return "Interventionist";
    }
  }
}
