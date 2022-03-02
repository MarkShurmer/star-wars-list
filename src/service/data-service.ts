import axios from "axios";
import React, { createContext } from "react";
import { Film, Person, Starship } from "../types";
import { CharacterResponse, PeopleResponse, Planet } from "../types";

// export const defaultState: Partial<State> = {
//   favourites: [] as Person[],
//   selectedCharacter: undefined,
// };

// export const StateContext = createContext<State>(defaultState as State);

export const getPlanet = async (url: string): Promise<string> => {
  const planetResponse = await axios.get<Planet>(url);

  return planetResponse.data.name;
};

export const getFilm = async (url: string): Promise<string> => {
  const filmsResponse = await axios.get<Film>(url);

  return filmsResponse.data.title;
};

export const getStarship = async (url: string): Promise<string> => {
  const shipsResponse = await axios.get<Starship>(url);

  return shipsResponse.data.name;
};

const populateStarships = async (
  starShipUrls: Array<string>
): Promise<Array<string>> => {
  const ships = starShipUrls.map(async (url) => {
    const shipName = await getStarship(url);
    return shipName;
  });
  return Promise.all(ships);
};

const populateFilms = (filmUrls: Array<string>): Promise<Array<string>> => {
  const films = filmUrls.map((url) => getFilm(url));

  return Promise.all(films);
};

export const getPeople = async (
  pageNumber: number,
  filter: string
): Promise<PeopleResponse> => {
  let url = `https://swapi.dev/api/people?page=${pageNumber}`;
  url += filter !== "" ? `&search=${filter}` : "";

  // now get the data
  const charsResponse = await axios.get<CharacterResponse>(url);

  const peoples = charsResponse.data.results.map(async (char: Person) => {
    return {
      ...char,
      homeworld: await getPlanet(char.homeworld),
      starships: await populateStarships(char.starships),
      films: await populateFilms(char.films),
    };
  });

  // get all the characters into the chars data
  return {
    people: await Promise.all(peoples),
    total: charsResponse.data.count,
    hasNext: charsResponse.data.next !== null,
  };
};
