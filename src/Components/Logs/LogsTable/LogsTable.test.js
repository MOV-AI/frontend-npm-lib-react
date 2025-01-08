import React from "react";
import { render } from "@testing-library/react";
import LogsTable from "./LogsTable";
import "@testing-library/jest-dom";

describe("Tests of component LogsTable", () => {
  it("renders the component (smoke test)", () => {
    const { container } = render(<LogsTable></LogsTable>);
    expect(container).toBeInTheDocument();
  });
  it("renders custom columns", () => {
    const { container } = render(
      <LogsTable
        columns={["Time"]}
        columnList={{
          Time: {
            label: "Time",
            dataKey: "time",
            width: 110,
            render: (time) => {},
          },
        }}
      ></LogsTable>,
    );
    expect(container).toBeInTheDocument();
  });
});
