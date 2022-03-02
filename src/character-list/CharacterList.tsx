import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Button,
  Input,
  HStack,
  Flex,
  VStack,
} from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { getPeople } from "../service/data-service";
import { Person } from "../types";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { peopleState, selectedCharacterState } from "../atoms";

export const CharacterList: FC<{}> = () => {
  const [pageNumber, setPageNumber] = useState(1);
  //const [people, setPeople] = useState<Array<Person>>([]);
  const [totalPeople, setTotalPeople] = useState(0);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const [people, setPeople] = useRecoilState(peopleState);
  const [selectedCharacter, setSelectedCharacter] = useRecoilState(
    selectedCharacterState
  );

  const loadPeople = async () => {
    const peopleResponse = await getPeople(pageNumber, filter);
    setPeople(peopleResponse.people);
    setTotalPeople(peopleResponse.total);
  };

  useEffect(() => {
    loadPeople();
  }, [pageNumber]);

  const gotoNextPage = () => {
    setPageNumber(pageNumber + 1);
    loadPeople();
  };

  const gotoPrevPage = () => {
    setPageNumber(pageNumber - 1);
    loadPeople();
  };

  const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const doFilter = () => {
    loadPeople();
  };

  const selectCharacter = (person: Person) => {
    setSelectedCharacter(person);
    navigate("/details");
  };

  return (
    <div data-testid="character-list">
      <h3>Character list</h3>
      <VStack>
        <HStack>
          <Input placeholder="Filter" onChange={changeFilter} value={filter} />
          <Button colorScheme="blue" onClick={doFilter}>
            Apply
          </Button>
        </HStack>

        <Table variant="simple">
          <TableCaption placement="top">Characters</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Gender</Th>
              <Th>Home planet</Th>
            </Tr>
          </Thead>
          <Tbody>
            {people.map((person) => (
              <Tr key={person.name} onClick={() => selectCharacter(person)}>
                <Td>{person.name}</Td>
                <Td>{person.gender}</Td>
                <Td>{person.homeworld}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <HStack>
          <Box>Page {pageNumber}</Box>
          <Box>Total characters {totalPeople}</Box>

          <Button variant="ghost" onClick={gotoPrevPage}>
            Prev
          </Button>
          <Button variant="ghost" ml="3" onClick={gotoNextPage}>
            Next
          </Button>
        </HStack>
      </VStack>
    </div>
  );
};
