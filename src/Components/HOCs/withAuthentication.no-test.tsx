import React from "react";
import { render } from "@testing-library/react";
import withAuthentication from "./withAuthentication";

const MockComponent = () => <div>hello</div>;

describe("Render", () => {
  it("renders the component (smoke test)", () => {
    const HOC = withAuthentication(MockComponent, "testApp");

    const { getByText } = render(<HOC />);
    expect(getByText("hello")).toBeInTheDocument();
  });
});
