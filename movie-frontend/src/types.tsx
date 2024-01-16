export type Review = {
  body: string;
  _class: string;
};

export type Movie = {
  imdbId: string;
  title: string;
  trailerLink: string;
  poster: string;
  reviewIds: Array<Review>;
  backdrops: Array<string>;
};
