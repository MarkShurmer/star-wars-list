import axios from "axios";
import React, { createContext } from "react";
import { Person } from "../types";
import {
  CharacterResponse,
  Favourites,
  PeopleResponse,
  Planet,
  PlanetResponse,
} from "../types";

let planets: Array<Planet>;

export const defaultFavourites = {
  people: [],
};

export const FavouritesContext = createContext<Favourites>(defaultFavourites);

export const loadPlanets = async () => {
  const planetsResponse = await axios.get<PlanetResponse>(
    "https://swapi.dev/api/planets"
  );

  planets = planetsResponse.data.results;
};

export const getPeople = async (
  pageNumber: number,
  filter: string
): Promise<PeopleResponse> => {
  let url = `https://swapi.dev/api/people?page=${pageNumber}`;
  url += filter !== "" ? `&search=${filter}` : "";

  // now get the data
  const charsResponse = await axios.get<CharacterResponse>(url);

  // get all the characters into the chars data
  return {
    people: charsResponse.data.results.map((char: Person) => {
      const homePlanet =
        planets.find((planet: Planet) => planet.url === char.homeworld)?.name ??
        "Unknown";
      return { ...char, homeworld: homePlanet };
    }),
    total: charsResponse.data.count,
    hasNext: charsResponse.data.next !== null,
  };
};
