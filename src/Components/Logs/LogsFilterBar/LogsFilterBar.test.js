import React from "react";
import { render } from "@testing-library/react";
import LogsFilterBar from "./LogsFilterBar";

describe("Tests of component LogsFilterBar", () => {
  it("renders the component (smoke test)", () => {
    const { container } = render(<LogsFilterBar></LogsFilterBar>);
    expect(container).toBeInTheDocument();
  });
});
