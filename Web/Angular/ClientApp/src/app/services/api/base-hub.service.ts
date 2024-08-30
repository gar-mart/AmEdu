import { Injectable, OnDestroy, inject } from "@angular/core";
import { HubConnection, HubConnectionBuilder, HubConnectionState, RetryContext } from "@microsoft/signalr";
import { Utilities } from "app/helpers/utilities/utilities";
import { environment } from "environments/environment";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

export type HubServiceOptions = { allowAnonymous?: boolean };
const defaultOptions: HubServiceOptions = { allowAnonymous: false };

@Injectable({
  providedIn: "root",
})
export abstract class BaseHubService implements OnDestroy {
  private connect$: Promise<void>;

  protected readonly subscriptions: Subscription;
  protected connection: HubConnection;
  protected hubUrl: string;

  constructor(hub: string, options = defaultOptions) {
    this.hubUrl = `${environment.baseUrl || Utilities.baseUrl()}/api/${hub}`;

    if (!options.allowAnonymous) {
      this.subscriptions = inject(AuthService)
        .getLoginStatusEvent()
        .subscribe(isLoggedIn => {
          if (!isLoggedIn && this.isConnected) {
            this.connection.stop(); // terminate the connection once logged out because this hub requires the user to be authenticated
            this.connection = null;
          }
        });
    }
  }

  protected connect() {
    if (
      [HubConnectionState.Connected, HubConnectionState.Connecting, HubConnectionState.Reconnecting].includes(
        this.connection?.state
      )
    ) {
      return this.connect$;
    }
    if (!this.connection) {
      this.connection = new HubConnectionBuilder()
        .withUrl(this.hubUrl)
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext: RetryContext): number | null => {
            // the default retry behavior retries connection after 0 seconds, 2 seconds, 10 seconds, and one last time at 30 seconds.
            // this custom retry policy does the same thing, but instead of giving up after 30 seconds, we try to reconnect every minute forever or until the connection is null
            if (!this.connection) {
              return null;
            }

            switch (retryContext.previousRetryCount) {
              case 0:
                return 0;
              case 1:
                return 2000;
              case 2:
                return 10000;
              case 3:
                return 30000;
              default:
                return 60000;
            }
          },
        })
        .build();
    }
    this.connect$ = new Promise((resolve, reject) => {
      this.connection
        .start()
        .then(() => {
          resolve();
        })
        .catch(error => reject(error));
    });
    return this.connect$;
  }

  public get isConnected() {
    return this.connection?.state == HubConnectionState.Connected;
  }

  ngOnDestroy(): void {
    if (this.isConnected) {
      this.connection?.stop();
    }
    this.subscriptions?.unsubscribe();
  }
}
