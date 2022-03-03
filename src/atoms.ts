import { atom, selector } from "recoil";
import { Person } from "./types";

export const selectedCharacterState = atom<Person>({
  key: "selectedCharacterState", // unique ID (with respect to other atoms/selectors)
  default: {
    name: "",
    gender: "",
    eye_color: "",
    hair_color: "",
    homeworld: "",
    isFavourite: false,
    films: [],
    starships: [],
  }, // default value (aka initial value)
});

export const peopleState = atom<Array<Person>>({
  key: "peopleState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const favouritesState = atom<Array<Person>>({
  key: "favouritesState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const pageNumberState = atom<number>({
  key: "pageNumberState", // unique ID (with respect to other atoms/selectors)
  default: 1, // default value (aka initial value)
});
