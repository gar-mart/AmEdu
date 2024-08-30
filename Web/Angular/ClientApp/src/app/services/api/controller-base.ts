import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiBase } from "./api-base.service";

@Injectable({ providedIn: "root" })
export class ControllerBase<Interface> extends ApiBase {
  constructor(http: HttpClient, protected controller: string) {
    super(http);
    this.baseUrl = `${this.baseUrl}/${controller}`;
  }

  protected $get<T = Interface[]>(filter: object = undefined): Observable<T> {
    return this._get<T>({ query: filter });
  }

  protected $getById<T = Interface>(id: string | number): Observable<T> {
    return this._getById<T>(id);
  }

  protected $getBySearch<T = Interface[]>(searchTerm: string, filter: object = undefined): Observable<T> {
    return this._getBySearch<T>(searchTerm, { query: filter });
  }

  protected $post<T = number | string>(body: Interface): Observable<T> {
    return this._post<T>(body);
  }

  protected $put<T = boolean>(body: Interface): Observable<T> {
    return this._put<T>(body);
  }

  protected $putById<T = boolean>(body: Interface, id: number | string): Observable<T> {
    return this._putById<T>(body, id);
  }

  protected $delete<T = boolean>(id: number | string): Observable<T> {
    return this._delete<T>(id);
  }

  protected $deleteByItem<T = boolean>(body: Interface): Observable<T> {
    return this._deleteByItem<T>(body);
  }

  protected $getCount(): Observable<number> {
    return this._count();
  }
}
