import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

// const mockContext: State = {
//   favourites,
//   selectedCharacter,
//   setSelectedCharacter,
//   toggleFavourite,
// };

const AllTheProviders: FC = ({ children }) => {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <MemoryRouter>{children}</MemoryRouter>
      </RecoilRoot>
    </ChakraProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
