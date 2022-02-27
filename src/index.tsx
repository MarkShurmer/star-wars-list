import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";

import { Dashboard } from "./Dashboard";

ReactDOM.render(
  <ChakraProvider>
    <Dashboard />
  </ChakraProvider>,
  document.getElementById("root")
);
