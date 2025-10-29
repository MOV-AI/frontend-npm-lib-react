import React from "react";
import { render, screen } from "@testing-library/react";
import BasicVirtualizedTree from "./BasicVirtualizedTree";

describe("BasicVirtualizedTree", () => {
  it("renders without crashing and displays the tree section", () => {
    render(<BasicVirtualizedTree data={[{ id: 1, name: "Node 1" }]} />);
    expect(
      screen.getByTestId("section_basic-virtualized-tree"),
    ).toBeInTheDocument();
  });
});
