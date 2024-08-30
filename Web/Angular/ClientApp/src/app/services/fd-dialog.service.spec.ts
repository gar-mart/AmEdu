import { TestBed } from "@angular/core/testing";

import { FdDialogService } from "./fd-dialog.service";

describe("FdDialogService", () => {
  let service: FdDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdDialogService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
