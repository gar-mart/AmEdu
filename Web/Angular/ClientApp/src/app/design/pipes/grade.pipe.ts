import { Pipe, PipeTransform } from "@angular/core";
import { Utility } from "app/shared";

@Pipe({
  name: "grade",
})
export class GradePipe implements PipeTransform {
  transform(value: string[]): string {
    return Utility.buildGradeLevelString(value);
  }
}
