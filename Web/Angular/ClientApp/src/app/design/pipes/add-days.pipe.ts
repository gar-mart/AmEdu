import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "addDays",
})
export class AddDaysPipe implements PipeTransform {
  transform(date: Date | string, addDays: number): Date {
    const tranformedDate = new Date(date);
    tranformedDate.setDate(tranformedDate.getDate() + addDays);
    return tranformedDate;
  }
}
