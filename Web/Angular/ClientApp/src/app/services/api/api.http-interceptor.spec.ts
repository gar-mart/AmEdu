import { TestBed } from "@angular/core/testing";

import { ApiHttpInterceptor } from "./api.http-interceptor";

describe("ApiHttpInterceptor", () => {
  let service: ApiHttpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiHttpInterceptor);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
