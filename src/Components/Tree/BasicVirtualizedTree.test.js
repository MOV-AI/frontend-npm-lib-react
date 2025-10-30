import React from "react";
import { render, screen } from "@testing-library/react";
import BasicVirtualizedTree from "./BasicVirtualizedTree";

// --- START: Mocking 'react-virtualized-tree' ---
// We need to mock 'react-virtualized-tree' because in a JSDOM environment,
// the virtualization logic often prevents nodes from being rendered.
// This mock simply renders all nodes passed to it without virtualization.
jest.mock("react-virtualized-tree", () => {
  // Mock the default export (the 'Tree' component)
  return ({ nodes, children }) => {
    return (
      <div data-testid="mock-tree-container">
        {nodes.map((node) => {
          // The 'children' prop is a render function: ({ style, node }) => {...}
          return children({
            // Provide necessary props for the render function
            style: { paddingLeft: 0, marginLeft: 0 }, // Mock minimal style props
            node: node,
            key: node.id,
          });
        })}
      </div>
    );
  };
});
// --- END: Mocking 'react-virtualized-tree' ---

// Also mock the external component 'ListItemsTreeWithSearch' to simplify the test
// and prevent potential side effects from an unneeded dependency.
jest.mock("./TreeSearch", () => ({
  ListItemsTreeWithSearch: ({ children }) => <div>{children}</div>,
}));

describe("BasicVirtualizedTree", () => {
  it("renders without crashing and displays the tree section", () => {
    // You only need minimal data for the simple render test
    render(<BasicVirtualizedTree data={[{ id: 1, name: "Node 1" }]} />);
    expect(
      screen.getByTestId("section_basic-virtualized-tree"),
    ).toBeInTheDocument();
  });

  it("renders tree nodes correctly", () => {
    const data = [
      { id: 1, name: "Node 1" },
      { id: 2, name: "Node 2" },
    ];
    render(<BasicVirtualizedTree data={data} />);

    data.forEach((node) => {
      // Find the node by its name text
      // screen.getByText is generally preferred over queryByText if you expect it to be there.
      const found = screen.getByText(node.name, { exact: true });
      expect(found).toBeInTheDocument();
    });

    // OPTIONAL: Also check that the mock container is used
    expect(screen.getByTestId("mock-tree-container")).toBeInTheDocument();
  });
});
