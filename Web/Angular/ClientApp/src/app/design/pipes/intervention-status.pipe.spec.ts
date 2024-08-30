import { InterventionStatusPipe } from "./intervention-status.pipe";

describe("InterventionStatusPipe", () => {
  it("create an instance", () => {
    const pipe = new InterventionStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
