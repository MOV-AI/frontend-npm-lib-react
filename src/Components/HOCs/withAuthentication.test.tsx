import React from "react";
import { render, waitFor } from "@testing-library/react";
import withAuthentication from "./withAuthentication";
import withTheme from "./withTheme";

const MockComponent = () => <div>hello</div>;

describe("Render", () => {
  it("renders the component (smoke test)", async () => {
    const HOC = withAuthentication(MockComponent, "testApp");
    const Themed = withTheme(HOC);

    const { getByText } = render(<Themed />);
    expect(getByText("Preparing the bots")).toBeInTheDocument();

    // await for Username input to be rendered
    await waitFor(
      () => {
        expect(getByText("Username")).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });
});
