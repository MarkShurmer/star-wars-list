export type Person = {
  name: string;
  gender: string;
  homeworld: string;
};

export type Planet = {
  name: string;
  url: string;
};

export type PeopleResponse = {
  people: Array<Person>;
  total: number;
  hasNext: boolean;
};

export type Favourites = {
  people: Array<Person>;
};

export type CharacterResponse = {
  count: number;
  results: Array<Person>;
  next: string;
};

export type PlanetResponse = {
  count: number;
  results: Array<Planet>;
  next: string;
};
