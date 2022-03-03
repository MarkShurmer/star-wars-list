import { Box, Heading, SimpleGrid, Switch } from "@chakra-ui/react";
import React, { FC, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { favouritesState, selectedCharacterState } from "../atoms";
import { Person } from "../types";
import { useNavigate } from "react-router";

export const CharacterDetails: FC<{}> = () => {
  const [selectedCharacter, setSelectedCharacter] = useRecoilState<Person>(
    selectedCharacterState
  );
  const [favourites, setFavourites] = useRecoilState(favouritesState);
  const [isFavourite, setIsFavourite] = useState(true);
  const navigate = useNavigate();

  const toggleFavourite = () => {
    if (selectedCharacter !== undefined) {
      const favouritesIndex = favourites.findIndex(
        (fav) => fav.name === selectedCharacter.name
      );

      let newFavourites;
      if (favouritesIndex === -1) {
        newFavourites = [...favourites].concat(selectedCharacter);
      } else {
        // found, so remove
        newFavourites = [...favourites];
        newFavourites.splice(favouritesIndex, 1);
      }
      setFavourites(newFavourites);
      navigate("/favourites");
    }
  };

  useEffect(() => {
    const favouritesIndex = favourites.findIndex(
      (fav) => fav.name === selectedCharacter.name
    );

    setIsFavourite(favouritesIndex !== -1);
  }, []);

  return (
    <div data-testid="character-details">
      <Heading>Character details</Heading>
      {selectedCharacter && (
        <SimpleGrid columns={2} spacing={10}>
          <Box>Name</Box>
          <Box data-testid="name-char">{selectedCharacter.name}</Box>
          <Box>Favourite</Box>
          <Box>
            <Switch isChecked={isFavourite} onChange={toggleFavourite} />
          </Box>
          <Box>Hair colour</Box>
          <Box>{selectedCharacter.hair_color}</Box>
          <Box>Eye colour</Box>
          <Box>{selectedCharacter.eye_color}</Box>
          <Box>Gender</Box>
          <Box>{selectedCharacter.gender}</Box>
          <Box>Home planet</Box>
          <Box>{selectedCharacter.homeworld}</Box>

          <Box>Films</Box>
          <Box>
            <ul>
              {selectedCharacter.films.map((film) => (
                <li key={film}>{film}</li>
              ))}
            </ul>
          </Box>
          <Box>Starships</Box>
          <Box>
            <ul>
              {selectedCharacter.starships.map((ship) => (
                <li key={ship}>{ship}</li>
              ))}
            </ul>
          </Box>
        </SimpleGrid>
      )}
    </div>
  );
};
