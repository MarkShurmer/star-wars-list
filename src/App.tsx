import { ChakraProvider } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  FavouritesContext,
  defaultFavourites,
  loadPlanets,
} from "./service/data-service";
import { Dashboard } from "./dashboard/Dashboard";

export const App = () => {
  const [favourites, setFavourites] = useState(defaultFavourites);

  useEffect(() => {
    const loadThePlanets = async () => {
      await loadPlanets();
    };
    loadThePlanets();
  });

  return (
    <ChakraProvider>
      <BrowserRouter>
        <FavouritesContext.Provider value={favourites}>
          <Dashboard />
        </FavouritesContext.Provider>
      </BrowserRouter>
    </ChakraProvider>
  );
};
