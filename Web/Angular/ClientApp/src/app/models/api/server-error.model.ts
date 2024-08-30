export interface ServerError {
  type: string;
  title: string;
  status: number;
  detail: string;
  traceId: string;
}
