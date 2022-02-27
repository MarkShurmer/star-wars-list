import React from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Button,
  Link,
  Heading,
  GridItem,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { css, jsx } from "@emotion/react";
import {
  Route,
  Routes,
  BrowserRouter,
  Link as RouterLink,
} from "react-router-dom";
import { CharacterList } from "./character-list/CharacterList";
import { CharacterDetails } from "./character-details/CharacterDetails";
import { Favourites } from "./favourites/Favourites";

export const Dashboard = () => {
  const style = css`
    height: 100vh;
  `;
  return (
    <BrowserRouter>
      <VStack css={style}>
        <Heading>Star wars characters</Heading>
        <Flex align="flex-start" m="2">
          <Button as={RouterLink} to="/" m="3">
            List of characters
          </Button>

          <Button as={RouterLink} to="/favourites" m="3">
            Favourites
          </Button>
        </Flex>

        <Container centerContent>
          <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path="/details" element={<CharacterDetails />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </Container>
      </VStack>
    </BrowserRouter>
  );
};
