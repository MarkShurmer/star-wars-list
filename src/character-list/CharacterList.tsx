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
  VStack,
} from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { getPeople } from "../service/data-service";
import { Person } from "../types";
import { useNavigate } from "react-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageNumberState, peopleState, selectedCharacterState } from "../atoms";

export const CharacterList: FC<{}> = () => {
  const [pageNumber, setPageNumber] = useRecoilState(pageNumberState);
  const [totalPeople, setTotalPeople] = useState(0);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const [people, setPeople] = useRecoilState(peopleState);
  const setSelectedCharacter = useSetRecoilState(selectedCharacterState);
  //const [currentPage, setCurrentPage] = useState(1);

  const loadPeople = async (pageNumberToUse: number) => {
    const peopleResponse = await getPeople(pageNumberToUse, filter);
    setPeople(peopleResponse.people);
    setTotalPeople(peopleResponse.total);
    //setCurrentPage(pageNumber);
  };

  useEffect(() => {
    loadPeople(pageNumber);
  }, []);

  const gotoNextPage = () => {
    setPageNumber(pageNumber + 1);
    loadPeople(pageNumber + 1);
  };

  const gotoPrevPage = () => {
    setPageNumber(pageNumber - 1);
    loadPeople(pageNumber - 1);
  };

  const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const doFilter = () => {
    loadPeople(pageNumber);
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
