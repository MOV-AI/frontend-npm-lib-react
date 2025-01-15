// import React from "react";
// import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// import ConfigurationSelector from "../ConfigurationSelector";
// import { DATA_TYPES } from "../../Utils/DataTypes";

const mockedRowData = { key: "key", type: "string", value: "value" };
const mockedProps = {
  rowData: mockedRowData,
  onChange: (val) => {
    mockedRowData.value = val;
  },
};

describe("Test the component ConfigurationSelector", () => {
  it("renders the component (smoke test)", () => {
    // const { container } = render(
    //   <ConfigurationSelector rowProps={mockedProps}></ConfigurationSelector>
    // );
    // const input = screen.getByTestId("selector-text-input");
    // const iconButton = screen.getByTestId("open-selector-btn");
    // // Validate if main elements are present in component (container, input and iconButton)
    // expect(container).toBeInTheDocument();
    // expect(input).toBeInTheDocument();
    // expect(iconButton).toBeInTheDocument();
  });

  it("Open SelectScopeModal and validate rowData.value format", () => {
    // render(
    //   <ConfigurationSelector rowProps={mockedProps}></ConfigurationSelector>
    // );
    // // simulate click to open modal
    // // The mocked SelectScopeModal triggers the onSubmit prop when is opened
    // const iconButton = screen.getByTestId("open-selector-btn");
    // iconButton.click();
    // // Check input value
    // setImmediate(() => {
    //   const value = mockedProps.rowData.value;
    //   const isValidFormat = DATA_TYPES["config"].validation(value);
    //   expect(isValidFormat).toBeTruthy();
    // });
  });
});
