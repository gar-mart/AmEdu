export {}; // we need at least one import or export statement to declare global

declare global {
  interface Number {
    fdToPlurality(singularString: string, pluralString?: string): string;
  }
}

Number.prototype.fdToPlurality = function (singularString, pluralString = undefined) {
  if (this === 1) {
    return singularString;
  } else if (pluralString !== null && pluralString !== undefined) {
    return pluralString;
  } else if (singularString) {
    switch (singularString.toLowerCase()[singularString.length - 1]) {
      case "y":
        return singularString.substring(0, singularString.length - 1) + "ies";
      case "s":
        return singularString + "es";
      default:
        return singularString + "s";
    }
  } else {
    return singularString; // return null/undefined if that's what the user passed in for this value.
  }
};
