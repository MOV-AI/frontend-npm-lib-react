import React from "react";
import { render } from "@testing-library/react";
import withTheme from "./../HOCs/withTheme";
import VerticalBar from "./VerticalBar";
import "@testing-library/jest-dom";

const Themed = withTheme(VerticalBar);

describe("Tests of component VerticalBar", () => {
  it("renders the component (smoke test)", () => {
    const { container } = render(<Themed />);
    expect(container).toBeInTheDocument();
  });
});
