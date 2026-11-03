import type { Filme } from './navigation';

export type BuscaOMDb =
  | { Response: 'True'; Search: Filme[]; totalResults: string }
  | { Response: 'False'; Error: string };

export type DetalhesOMDb = {
  Response: 'True' | 'False';
  Error?: string;
  Title?: string;
  Year?: string;
  Genre?: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  Runtime?: string;
  imdbRating?: string;
};
