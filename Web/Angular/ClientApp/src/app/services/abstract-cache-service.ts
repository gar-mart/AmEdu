import hash from "hash-it";
import { Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";

export abstract class AbstractCacheService<T> {
  cacheDurationInMinutes: number = 5;
  readonly DEFAULT_KEY = "DEFAULT";

  private cache: {
    [id: string]: {
      expires: Date;
      value: Observable<T>;
    };
  } = {};

  /**
   * Get a value from the cache or null
   * @param object A key such as record id or it's primary key.
   */
  getValue(object?: any): Observable<T> {
    const key = object ? hash(object).toString() : this.DEFAULT_KEY;
    const item = this.cache[key];
    if (!item || new Date() > item.expires) {
      return null;
    }
    return item.value;
  }

  /**
   * Store a observable in the cache. It will be assigned shareReplay so it is only resolved once.
   * @param value The observable to call to get the value
   * @param object A key such as record id or it's primary key.
   */
  setValue(value: Observable<T>, object?: any) {
    value = value.pipe(shareReplay(1));
    const key = object ? hash(object).toString() : this.DEFAULT_KEY;
    const expires = new Date().fdAddMinutes(this.cacheDurationInMinutes);
    this.cache[key] = { expires, value };
    return value;
  }

  /**
   * Try to get a value form the cache or if not present or expired assign a new value.
   * @param value The observable to call to get the value
   * @param object A key such as record id or it's primary key.
   */
  getValueOrUpdate(value: Observable<T>, object?: any) {
    return this.getValue(object) ?? this.setValue(value, object);
  }

  /**
   * Clear a single item fromt he cache or the entire cache.
   * @param object A key such as record id or it's primary key.
   */
  clearCache(object?: any) {
    if (object) {
      const key = object ? hash(object).toString() : this.DEFAULT_KEY;
      delete this.cache[key];
    } else {
      this.cache = {};
    }
  }
}
