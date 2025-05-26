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
  captureRate: number;
  has_gender_differences: boolean;
  varieties: PokemonMeta;
  [key: string]: any;
}

export interface PokemonDetailRes {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_default: string;
    back_default: string;
  };
}
