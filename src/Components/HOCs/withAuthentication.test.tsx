import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import withAuthentication from "./withAuthentication";

const MockComponent = () => <div>hello</div>;

describe("Render", () => {
  it("renders the component (smoke test)", () => {
    const HOC = withAuthentication(MockComponent, "testApp");

    const { getByText } = render(<HOC />);

    expect(getByText("Login")).toBeInTheDocument();
  });
});
