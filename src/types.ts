export type Person = {
  name: string;
  gender: string;
  homeworld: string;
  hair_color: string;
  eye_color: string;
  isFavourite: boolean;
  films: Array<string>;
  starships: Array<string>;
};

export type Planet = {
  name: string;
  url: string;
};

export type Film = {
  title: string;
  url: string;
};

export type Starship = {
  name: string;
  url: string;
};

export type PeopleResponse = {
  people: Array<Person>;
  total: number;
  hasNext: boolean;
};

// export type State = {
//   favourites: Array<Person>;
//   selectedCharacter?: Person;
//   setSelectedCharacter: (char: Person) => void;
//   toggleFavourite: () => void;
// };

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

export type FilmResponse = {
  count: number;
  results: Array<Film>;
  next: string;
};

export type StarshipResponse = {
  count: number;
  results: Array<Starship>;
  next: string;
};
