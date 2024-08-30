import "./number";

declare global {
  interface Array<T> {
    fdToPlurality(singularString: string, pluralString?: string): string;
  }
}

Array.prototype.fdToPlurality = function (singularString, pluralString = undefined) {
  return this.length.fdToPlurality(singularString, pluralString);
};
