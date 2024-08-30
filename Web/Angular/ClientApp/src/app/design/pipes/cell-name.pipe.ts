import { Pipe, PipeTransform } from "@angular/core";
import { Cell } from "app/enums/cell.enum";

@Pipe({
  name: "cellName",
})
export class CellNamePipe implements PipeTransform {
  transform(cell: Cell | number, display: "grades" | "schools" = "schools"): string {
    switch (cell) {
      case Cell.ElementarySchool:
        return display === "grades" ? "K-5" : "Elementary School";
      case Cell.MiddleSchool:
        return display === "grades" ? "6-8" : "Middle School";
      case Cell.HighSchool:
        return display === "grades" ? "9-12" : "High School";
      default:
        return "";
    }
  }
}
