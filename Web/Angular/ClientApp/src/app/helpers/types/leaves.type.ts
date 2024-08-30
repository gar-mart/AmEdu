import { JoinWithPeriod } from "./join-with-period.type";
import { Prev } from "./prev.type";

/**
 * Recursively return all the "leaf" property paths of an object.
 * Leaf properties of an object include any property types which do not extend object.
 *
 * @example
 * type MyUser = { user: { firstName: string }, total: number };
 * Leaves<MyUser> // 'user.firstName'|'total'
 */
export type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? T extends Date
    ? "" // let Date objects be a leaf note
    : { [K in keyof T]-?: JoinWithPeriod<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : "";
