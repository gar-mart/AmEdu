interface Element {
  fdIndex: () => number;
  fdSiblings(selector: string | null): Element[];
}

Element.prototype.fdIndex = function () {
  return Array.from(this.parentNode.children).indexOf(this);
};

Element.prototype.fdSiblings = function (selector: string | null) {
  const siblings = [];
  let targets = selector ? this.parentNode.querySelectorAll(":scope > " + selector) : this.parentNode.children;

  for (let i = 0; i < targets.length; i++) {
    if (targets[i] !== this) siblings.push(targets[1]);
  }
  return siblings;
};
