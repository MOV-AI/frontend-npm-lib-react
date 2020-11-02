import React from "react";
import { render } from "@testing-library/react";
import NodesTreeTable from "./NodesTreeTable";

describe("Tests of component NodesTreeTable", () => {
  it("renders the component (smoke test)", () => {
    const { container } = render(<NodesTreeTable></NodesTreeTable>);
    expect(container).toBeInTheDocument();
  });
});
