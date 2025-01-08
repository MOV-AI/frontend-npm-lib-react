import React from "react";
import { render } from "@testing-library/react";
import LogsFilterBar from "./LogsFilterBar";
import "@testing-library/jest-dom";

describe("Tests of component LogsFilterBar", () => {
  it("renders the component (smoke test)", () => {
    const { container } = render(
      <LogsFilterBar advancedMode={true}></LogsFilterBar>,
    );
    expect(container).toBeInTheDocument();
  });
});
