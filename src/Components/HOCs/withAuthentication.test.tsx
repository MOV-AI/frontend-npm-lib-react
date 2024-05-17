import React from "react";
import { render } from "@testing-library/react";
import withAuthentication from "./withAuthentication";
import withTheme from "./withTheme";

const MockComponent = () => <div>hello</div>;

describe("Render", () => {
  it("renders the component (smoke test)", () => {
    const HOC = withAuthentication(MockComponent, "testApp");
    const Themed = withTheme(HOC);

    const { getByText } = render(<Themed />);
    expect(getByText("Username")).toBeInTheDocument();
  });
});
