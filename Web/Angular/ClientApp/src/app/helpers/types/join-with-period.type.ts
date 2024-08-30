/**
 * Concatenates type K with type P when K and P are strings or numbers with a '.' (period).
 */
export type JoinWithPeriod<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;
