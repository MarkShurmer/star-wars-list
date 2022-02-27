import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Dashboard } from "../Dashboard";

describe("Dashboard", () => {
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
