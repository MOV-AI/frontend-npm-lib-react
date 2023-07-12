import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import withAuthentication from "./withAuthentication";

const MockComponent = () => <div></div>;

describe("Render", () => {
  it("renders the component (smoke test)", async () => {
    const HOC = withAuthentication(MockComponent, "testApp");

    const { findByTestId, getByText } = render(<HOC />);

    const listNode = await findByTestId("section_login-panel");
    const loadingText = getByText("Preparing the bots");

    expect(listNode).toBeInTheDocument();
    expect(loadingText).toBeInTheDocument();
  });
});
