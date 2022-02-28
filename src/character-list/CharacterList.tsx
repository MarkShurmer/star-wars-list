import {
  Table,
  Thead,
  Tbody,
  Tfoot,
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

export const CharacterList: FC<{}> = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [people, setPeople] = useState<Array<Person>>([]);
  const [totalPeople, setTotalPeople] = useState(0);
  const [filter, setFilter] = useState("");

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

  return (
    <div data-testid="character-list">
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
              <Tr key={person.name}>
                <Td>{person.name}</Td>
                <Td>{person.gender}</Td>
                <Td>{person.homeworld}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex justify="space-around">
          <span>Page {pageNumber}</span>
          <span>Total characters {totalPeople}</span>
          <Box ml="5">
            <Button variant="ghost" onClick={gotoPrevPage}>
              Prev
            </Button>
            <Button variant="ghost" ml="3" onClick={gotoNextPage}>
              Next
            </Button>
          </Box>
        </Flex>
      </VStack>
    </div>
  );
};
