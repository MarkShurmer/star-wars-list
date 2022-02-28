import { fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { CharacterList } from "./CharacterList";
import { getPeople } from "../service/data-service";
import { render } from "../test-utils";

jest.mock("../service/data-service");

describe("CharacterList", () => {
  const mockPeepResponse = {
    count: 40,
    people: [
      { name: "John", gender: "Male" },
      { name: "Anna Camp", gender: "Female" },
    ],
    next: null,
  };
  const mockPeepResponseEmpty = {
    count: 0,
    people: [],
    next: null,
  };

  it("should show 2 rows", async () => {
    (getPeople as jest.Mock).mockResolvedValue(mockPeepResponse);

    const { getByTestId, getAllByRole } = render(<CharacterList />);

    await waitFor(() => {});
    const rows = getAllByRole("row");

    expect(getByTestId("character-list")).not.toBeNull();
    expect(rows.length).toBe(3);
  });

  it("should show no rows when no data", async () => {
    (getPeople as jest.Mock).mockResolvedValue(mockPeepResponseEmpty);

    const { getAllByRole } = render(<CharacterList />);
    await waitFor(() => {});
    const rows = getAllByRole("row");

    expect(rows.length).toBe(1);
  });

  it("should filter when apply clicked", async () => {
    (getPeople as jest.Mock).mockResolvedValue(mockPeepResponse);

    const { getByText, getByPlaceholderText } = render(<CharacterList />);
    const applyButton = getByText("Apply");
    const filterInput = getByPlaceholderText("Filter");

    // send some text
    fireEvent.change(filterInput, { target: { value: "luke" } });
    // click apply
    fireEvent.click(applyButton);

    // give it a chance
    await waitFor(() => {});
    expect(getPeople).toHaveBeenCalledWith(1, "luke");
  });
});
