import React from "react";
import "@testing-library/jest-dom";
import { render } from "./../../../testUtils";
import LogsFilterBar from "./LogsFilterBar";

describe("Tests of component LogsFilterBar", () => {
  it("renders the component (smoke test)", () => {
    const { container } = render(
      <LogsFilterBar></LogsFilterBar>
    );
    expect(container).toBeInTheDocument();
  });
});
