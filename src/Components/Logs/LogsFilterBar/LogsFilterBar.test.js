import React from "react";
import "@testing-library/jest-dom";
import { render } from "./../../../testUtils";
import withTheme from "./../../HOCs/withTheme";
import LogsFilterBar from "./LogsFilterBar";

const Themed = withTheme(LogsFilterBar);

describe("Tests of component LogsFilterBar", () => {
  it("renders the component (smoke test)", () => {
    const { container } = render(<Themed />);
    expect(container).toBeInTheDocument();
  });
});
