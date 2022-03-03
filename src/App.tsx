import { ChakraProvider } from "@chakra-ui/react";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import { RecoilRoot } from "recoil";

export const App = () => {
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
