export interface PageResponse<T> {
  count: number;
  next: string;
  results: T[] | null;
  [key: string]: any;
}

export interface SpeciesMeta {
  name: string;
  url: string;
}

export interface SpeciesOverviewRes {
  names: SpeciesOverviewName[];
  base_happiness: number;
  [key: string]: any;
}

export interface SpeciesOverviewName {
  language: {
    name: string;
    url: string;
  };
  name: string;
}
