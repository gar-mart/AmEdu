import { ToPipe } from "./to.pipe";

describe("ToPipe", () => {
  it("create an instance", () => {
    const pipe = new ToPipe();
    expect(pipe).toBeTruthy();
  });
});
