import React from "react";
import { render } from "@testing-library/react";
import RobotFlowBar from "./RobotFlowBar";

describe("Tests of component RobotFlowBar", () => {
  it("renders the component (smoke test)", () => {
    const { container } = render(<RobotFlowBar></RobotFlowBar>);
    expect(container).toBeInTheDocument();
  });
});
