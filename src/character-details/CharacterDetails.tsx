import { Box, Heading, SimpleGrid, Switch } from "@chakra-ui/react";
import React, { FC } from "react";
import { useRecoilState } from "recoil";
import { peopleState, selectedCharacterState } from "../atoms";
import { Person } from "../types";

export const CharacterDetails: FC<{}> = () => {
  const [selectedCharacter, setSelectedCharacter] = useRecoilState<Person>(
    selectedCharacterState
  );
  const [people, setPeople] = useRecoilState(peopleState);

  const toggleFavourite = () => {
    if (selectedCharacter !== undefined) {
      const newCharacter = {
        ...selectedCharacter,
        isFavourite: !selectedCharacter.isFavourite,
      };

      const peopleIndex = people.findIndex(
        (fav) => fav.name === selectedCharacter.name
      );

      setSelectedCharacter(newCharacter);

      if (peopleIndex > -1) {
        // found, so update
        const peopleCopy = people
          .slice(0, peopleIndex - 1)
          .concat(newCharacter)
          .concat(people.slice(peopleIndex + 1));
        setPeople(peopleCopy);
      }
    }
  };

  return (
    <div data-testid="character-details">
      <Heading>Character details</Heading>
      {selectedCharacter && (
        <SimpleGrid columns={2} spacing={10}>
          <Box>Name</Box>
          <Box data-testid="name-char">{selectedCharacter.name}</Box>
          <Box>Favourite</Box>
          <Box>
            <Switch
              isChecked={selectedCharacter.isFavourite}
              onChange={toggleFavourite}
            />
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
