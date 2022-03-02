import { ChakraProvider } from "@chakra-ui/react";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import { RecoilRoot } from "recoil";

export const App = () => {
  // const [favourites, setFavourites] = useState<Array<Person>>([]);
  // const [selectedCharacter, setSelectedCharacter] = useState<Person>();

  // const toggleFavourite = () => {
  //   if (selectedCharacter !== undefined) {
  //     const favsCopy = [...favourites];
  //     const favOnList = favsCopy.findIndex(
  //       (fav) => fav.name === selectedCharacter.name
  //     );
  //     if (favOnList === -1) {
  //       // not found
  //       favsCopy.push(selectedCharacter);
  //     } else {
  //       // found, so remove
  //       favsCopy.splice(favOnList, 1);
  //     }
  //     setFavourites(favsCopy);
  //   }
  // };

  // const stateContext: State = {
  //   favourites,
  //   selectedCharacter,
  //   setSelectedCharacter,
  //   toggleFavourite,
  // };

  return (
    <ChakraProvider>
      <BrowserRouter>
        <RecoilRoot>
          <Dashboard />
        </RecoilRoot>
      </BrowserRouter>
    </ChakraProvider>
  );
};
