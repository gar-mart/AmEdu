import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "gradeName",
})
export class GradeNamePipe implements PipeTransform {
  transform(gradeLevel: string, isHtml = true): string {
    const wrapSup = (suffix: "st" | "nd" | "rd" | "th") => (isHtml ? `<sup>${suffix}</sup>` : suffix);

    switch (gradeLevel?.toLowerCase() || "") {
      case "k":
        return "Kindergarten";
      case "1":
        return `${gradeLevel}${wrapSup("st")} Grade`;
      case "2":
        return `${gradeLevel}${wrapSup("nd")} Grade`;
      case "3":
        return `${gradeLevel}${wrapSup("rd")} Grade`;
      case "":
        return "";
      default:
        return `${gradeLevel}${wrapSup("th")} Grade`;
    }
  }
}
