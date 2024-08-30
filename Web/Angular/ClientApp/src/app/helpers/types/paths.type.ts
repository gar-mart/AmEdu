import { JoinWithPeriod } from "./join-with-period.type";
import { Prev } from "./prev.type";

/**
 * Recursively return all the property paths of an object.
 *
 * @example
 * type MyUser = { user: { firstName: string }, total: number };
 * Paths<MyUser> // 'user'|'user.firstName'|'total'
 */
export type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? `${K}` | JoinWithPeriod<K, Paths<T[K], Prev[D]>> : never;
    }[keyof T]
  : "";
