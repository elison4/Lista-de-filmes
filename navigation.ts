export type Filme = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type RootStackParamList = {
  Home: undefined;
  Details: { filme: Filme };
};
