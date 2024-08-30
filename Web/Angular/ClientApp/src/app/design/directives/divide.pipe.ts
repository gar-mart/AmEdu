import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "divide",
})
export class DividePipe implements PipeTransform {
  transform(numerator: number, denominator: number): number {
    if (!denominator) {
      return 1;
    }

    return numerator / denominator;
  }
}
