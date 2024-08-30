import { TestBed } from "@angular/core/testing";

import { AccountHubService } from "./account-hub.service";

describe("AccountHubService", () => {
  let service: AccountHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountHubService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
