export interface SpeciesMeta {
  name: string;
  url: string;
}

export interface PageResponse {
  count: number;
  next: string;
  results: SpeciesMeta[];
  [key: string]: any;
}
