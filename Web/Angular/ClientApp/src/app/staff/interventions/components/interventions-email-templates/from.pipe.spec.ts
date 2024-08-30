import { FromPipe } from "./from.pipe";

describe("FromPipe", () => {
  it("create an instance", () => {
    const pipe = new FromPipe();
    expect(pipe).toBeTruthy();
  });
});
