import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { AppComponent } from "../components/app.component";
import { LoginComponent } from "../components/login/login.component";

import { AuthService } from "../services/auth/auth.service";
import { FdTitleService } from "../services/fd-title.service";
import { LocalStoreManager } from "../services/local-store-manager.service";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, RouterTestingModule],
      declarations: [AppComponent, LoginComponent],
      providers: [AuthService, FdTitleService, LocalStoreManager],
    }).compileComponents();
  });
});
