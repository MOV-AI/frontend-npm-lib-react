import React from "react";
import { render } from "@testing-library/react";
import LogsTable from "./LogsTable";

describe("Tests of component LogsTable", () => {
  it("renders the component (smoke test)", () => {
    const { container } = render(<LogsTable></LogsTable>);
    expect(container).toBeInTheDocument();
  });
  it("renders custom columns", () => {
    const { container } = render(
      <LogsTable
        columns={["Time", "Level", "Module", "Function", "Message"]}
      ></LogsTable>
    );
    expect(container).toBeInTheDocument();
  });
});
