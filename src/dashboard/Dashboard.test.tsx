import React from "react";
import { render, fireEvent, waitFor } from "../test-utils";
import { Dashboard } from "./Dashboard";
import { getPeople } from "../service/data-service";

jest.mock("../service/data-service");

describe("Dashboard", () => {
  const mockPeepResponse = {
    count: 40,
    people: [
      { name: "John", gender: "Male", films: [], starships: [] },
      { name: "Anna Camp", gender: "Female", films: [], starships: [] },
    ],
    next: null,
  };

  beforeAll(() => {
    (getPeople as jest.Mock).mockResolvedValue(mockPeepResponse);
  });

  it("should load with default route", () => {
    const { getByTestId } = render(<Dashboard />);

    expect(getByTestId("character-list")).not.toBeNull();
  });

  it("should switch to favourites", async () => {
    const { getByTestId, getByText } = render(<Dashboard />);
    const favButton = getByText("Favourites");

    fireEvent.click(favButton);
    const favContent = await waitFor(() => getByTestId("favourites"));
    expect(favContent).not.toBeNull();
  });
});
