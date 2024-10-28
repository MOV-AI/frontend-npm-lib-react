import React from "react";
import { render } from "@testing-library/react";
import withTheme from "./../../HOCs/withTheme";
import LogsTable from "./LogsTable";
import "@testing-library/jest-dom";

const Themed = withTheme(LogsTable);

describe("Tests of component LogsTable", () => {
  it("renders the component (smoke test)", () => {
    const { container } = render(<Themed />);
    expect(container).toBeInTheDocument();
  });
  it("renders custom columns", () => {
    const { container } = render(
      <Themed
        columns={["Time"]}
        columnList={{
          Time: {
            label: "Time",
            dataKey: "time",
            width: 110,
            render: () => {},
          },
        }}
      ></Themed>,
    );
    expect(container).toBeInTheDocument();
  });
});
