import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Utilities } from "app/helpers/utilities/utilities";
import { environment } from "environments/environment";
import { merge } from "lodash";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ApiBase {
  protected baseUrl: string;
  protected environment = environment;

  constructor(protected http: HttpClient) {
    this.baseUrl = `${this.environment.baseUrl || Utilities.baseUrl()}/api`;
  }

  protected _get<T>(options: ApiOptions = null): Observable<T | null> {
    const getUrl = this.buildUrl(options);
    return this.http.get<T>(getUrl);
  }

  protected _getById<T>(id: number | string, options: ApiOptions = null): Observable<T | null> {
    const getUrl = this.buildUrl(options, `${this.baseUrl}/${encodeURIComponent(id)}`);
    return this.http.get<T>(getUrl);
  }

  protected _getBySearch<T>(searchTerm: string | string, options: ApiOptions = null): Observable<T | null> {
    const ops = merge({ query: { searchTerm } }, options);
    const getUrl = this.buildUrl(ops, `${this.baseUrl}/Search`);
    return this.http.get<T>(getUrl);
  }

  protected _post<T>(body: any, options: ApiOptions = null): Observable<T | null> {
    const postUrl = this.buildUrl(options);
    return this.http.post<T>(postUrl, body);
  }

  protected _put<T>(body: any, options: ApiOptions = null): Observable<T | null> {
    const putUrl = this.buildUrl(options);
    return this.http.put<T>(putUrl, body);
  }

  protected _putById<T>(body: any, id: number | string, options: ApiOptions = null): Observable<T | null> {
    const putUrl = this.buildUrl(options, `${this.baseUrl}/${encodeURIComponent(id)}`);
    return this.http.put<T>(putUrl, body);
  }

  protected _delete<T>(id: number | string = "", options: ApiOptions = null): Observable<T | null> {
    const deleteUrl = this.buildUrl(options, `${this.baseUrl}/${encodeURIComponent(id)}`);
    return this.http.delete<T>(deleteUrl);
  }

  protected _deleteByItem<T>(body: any, apiOptions: ApiOptions = null): Observable<T | null> {
    const deleteUrl = this.buildUrl(apiOptions, this.baseUrl);
    return this.http.delete<T>(deleteUrl, { body });
  }

  protected _count(options: ApiOptions = null): Observable<number> {
    const getUrl = this.buildUrl(options, `${this.baseUrl}`);
    return this.http.head<never>(getUrl, { observe: "response" }).pipe(
      map(resp => {
        return parseInt(resp.headers.get("count"));
      })
    );
  }

  protected _downloadFile(options: ApiOptions = null, body?: any) {
    const downloadUrl = this.buildUrl(options, options.url ? null : `${this.baseUrl}/Export`);
    const downloadRequest =
      body != null
        ? this.http.post(downloadUrl, body, {
            reportProgress: true,
            responseType: "blob",
            observe: "events",
          })
        : this.http.get(downloadUrl, {
            reportProgress: true,
            responseType: "blob",
            observe: "events",
          });

    return downloadRequest.pipe(
      tap((event: HttpEvent<Blob> & { filename: string }) => {
        if (event.type === HttpEventType.Response) {
          event.filename = event.headers.get("content-disposition")?.split("filename=")[1]?.split(";")[0];
        }
      })
    );
  }

  /**
   * Builds the API URL based on the input.
   * @param options The url and query properties are appended to the rootUrl
   * @param rootUrl The root of the API url. If falsey or not provided, then the baseUrl is used by default.
   */
  protected buildUrl(options: ApiOptions, rootUrl: string = null) {
    let url = rootUrl || this.baseUrl;
    const queryString = ApiBase.toQueryString(options?.query);

    if (options?.url) {
      let relativeUrl = options.url;
      if (relativeUrl.startsWith("/")) {
        relativeUrl = relativeUrl.substring(1);
      }

      if (url.endsWith("/")) {
        url += relativeUrl;
      } else {
        url += "/" + relativeUrl;
      }
    }

    return url + queryString;
  }

  /**
   * If query is a string, it is returned with the question mark conditionally trimmed based on withQuestionMark.
   * If query is an object, the object's keys are iterated and converted into a key-value pairs with encoding.
   * @param query
   * @param withQuestionMark Conditionally ensures the result is prepended with a question mark. Defaults to true.
   * @returns {string} An encoded query string without the leading '?'.
   */
  public static toQueryString(query: string | {}, withQuestionMark: boolean = true): string {
    let queryString = "";

    if (!query) {
      return "";
    }

    if (typeof query === "string") {
      queryString = query.startsWith("?")
        ? query.substring(1) // trim the leading question mark
        : query;
    } else {
      const params = new URLSearchParams();

      for (let key in query) {
        const appendArray = (value: any[]) => {
          for (let elem of value) {
            params.append(key, elem instanceof Date ? elem.toISOString() : elem);
          }
        };

        if (Array.isArray(query[key])) {
          appendArray(query[key]);
        } else if (query[key] !== null && query[key] !== undefined) {
          let value = query[key];

          if (value instanceof Date) {
            value = value.toISOString();
          } else if (value instanceof Set) {
            appendArray([...value]);
            continue;
          }

          params.set(key, query[key] instanceof Date ? query[key].toISOString() : query[key]);
        }
      }

      queryString = params.toString();
    }

    return withQuestionMark ? "?" + queryString : queryString;
  }
}

export interface ApiOptions {
  /** Query to append to the URL */
  query?: string | {};
  /** URL to append to the base URL */
  url?: string;
}
