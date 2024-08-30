export abstract class Enum {
  static getDefaultValue(enumName: string) {
    return enumName.split(/(?=[A-Z])/).join(" ");
  }
}
