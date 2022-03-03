import React, { FC } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, VStack } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { favouritesState, peopleState } from "../atoms";
import { Person } from "../types";

export const Favourites: FC<{}> = () => {
  const favourites = useRecoilValue<Array<Person>>(favouritesState);
  const [people, setPeople] = useRecoilState(peopleState);

  return (
    <div data-testid="favourites">
      <h3>Favourites</h3>
      <VStack>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Gender</Th>
              <Th>Home planet</Th>
            </Tr>
          </Thead>
          <Tbody>
            {favourites.map((person) => (
              <Tr key={person.name}>
                <Td>{person.name}</Td>
                <Td>{person.gender}</Td>
                <Td>{person.homeworld}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </div>
  );
};
