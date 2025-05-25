export interface SpeciesMeta {
  name: string;
  url: string;
}

export interface PageResponse<T> {
  count: number;
  next: string;
  results: T[] | null;
  [key: string]: any;
}

export interface SpeciesOverviewName {
  language: {
    name: string;
    url: string;
  };
  name: string;
}

export interface PokemonMeta {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  };
}

export interface SpeciesOverviewRes {
  names: SpeciesOverviewName[];
  base_happiness: number;
  varieties: PokemonMeta;
  [key: string]: any;
}
