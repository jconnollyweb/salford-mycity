import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CharitiesAndGroups from "./CharitiesAndGroups";

// Mock the fetch API
global.fetch = jest.fn();

const mockCharities = [
  {
    id: 1,
    title: { rendered: "Boys Group at The Beacon Centre, Salford Youth Service" },
    acf: { address: "6, London Street Salford", postcode: "M6 6QT" },
    _embedded: {
      "wp:featuredmedia": [
        { source_url: "/placeholder.jpg" },
      ],
    },
  },
  {
    id: 2,
    title: { rendered: "Boothstown Youth Café with Salford Youth Service" },
    acf: { address: "Standfield Drive Boothstown Salford", postcode: "M28 1NB" },
    _embedded: {
      "wp:featuredmedia": [
        { source_url: "/placeholder.jpg" },
      ],
    },
  },
];

test("renders the component and displays charities", async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockCharities,
  });

  render(<CharitiesAndGroups />);

  // Check loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Wait for the data to load
  const charityA = await screen.findByText("Boys Group at The Beacon Centre, Salford Youth Service");
  const charityB = await screen.findByText("Boothstown Youth Café with Salford Youth Service");

  // Check if data is displayed
  expect(charityA).toBeInTheDocument();
  expect(charityB).toBeInTheDocument();
});

test("filters charities by postcode", async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockCharities,
  });

  render(<CharitiesAndGroups />);

  // Wait for the data to load
  await screen.findByText("Boys Group at The Beacon Centre, Salford Youth Service");

  // Check filter options
  const postcodeFilter = screen.getByLabelText("M6 6QT");
  fireEvent.click(postcodeFilter);

  // Ensure only Charity A is displayed
  expect(screen.getByText("Boys Group at The Beacon Centre, Salford Youth Service")).toBeInTheDocument();
  expect(screen.queryByText("Boothstown Youth Café with Salford Youth Service")).not.toBeInTheDocument();
});
