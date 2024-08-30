import { TestBed } from "@angular/core/testing";

import { FdRouterService } from "./fd-router.service";

describe("FdRouterService", () => {
  let service: FdRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdRouterService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
