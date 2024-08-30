export interface Tab {
  label: string;
  path?: string;
  routerPath?: string;
  tabs?: Tab[];
}
