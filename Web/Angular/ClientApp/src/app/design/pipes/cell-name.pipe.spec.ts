import { CellNamePipe } from "./cell-name.pipe";

describe("CellNamePipe", () => {
  it("create an instance", () => {
    const pipe = new CellNamePipe();
    expect(pipe).toBeTruthy();
  });
});
