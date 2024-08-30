import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "addWeeks",
})
export class AddWeeksPipe implements PipeTransform {
  transform(date: Date | string, addWeeks: number): Date {
    const tranformedDate = new Date(date);
    tranformedDate.setDate(tranformedDate.getDate() + 7 * addWeeks);
    return tranformedDate;
  }
}
