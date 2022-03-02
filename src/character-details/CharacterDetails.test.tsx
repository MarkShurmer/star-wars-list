import React from "react";
import { Dashboard } from "../dashboard/Dashboard";
import { fireEvent, render, waitFor } from "../test-utils";
import { getPeople } from "../service/data-service";

jest.mock("../service/data-service");

describe.skip("Character details", () => {
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

  it("should display correct name if selected", async () => {
    const { findByTestId, getAllByRole, debug, container } = render(
      <Dashboard />
    );

    await waitFor(() => {});
    const rows = getAllByRole("row");
    console.log(debug(container));

    // select first row
    fireEvent.click(rows[1]);

    const nameCell = await findByTestId("name-char");

    expect(nameCell).toBe("John");
  });
});
