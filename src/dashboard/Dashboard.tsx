import React from "react";
import { Container, Flex, Button, Heading, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { Route, Routes, Link as RouterLink } from "react-router-dom";
import { CharacterList } from "../character-list/CharacterList";
import { CharacterDetails } from "../character-details/CharacterDetails";
import { Favourites } from "../favourites/Favourites";

export const Dashboard = () => {
  const style = css`
    height: 100vh;
  `;
  return (
    <VStack css={style}>
      <Heading>Star wars characters</Heading>
      <Flex align="flex-start" m="2">
        <Button variant="link" as={RouterLink} to="/" m="3" colorScheme="green">
          List of characters
        </Button>

        <Button
          variant="link"
          as={RouterLink}
          to="/favourites"
          m="3"
          colorScheme="green"
        >
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
  );
};
