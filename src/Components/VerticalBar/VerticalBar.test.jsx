import React from "react";
import { render } from "@testing-library/react";
import VerticalBar from "./VerticalBar";
import '@testing-library/jest-dom'

describe("Tests of component VerticalBar", () => {
  it("renders the component (smoke test)", () => {
    const { container } = render(<VerticalBar></VerticalBar>);
    expect(container).toBeInTheDocument();
  });
});
