import BooleanType from "./BooleanType";
import { getRendered, testValidation } from "../testUtils";
import { screen, fireEvent } from "@testing-library/react";

testValidation(
  BooleanType,
  [
    false,
    false,
    true,
    false,
    true,
    true,
    false, // 6
    false,
    false,
    false,
    false,
    false,
    false, // 12
    false,
    false,
    false,
    false,
    false,
    false,
    false, // 19
    false,
    false,
    false,
    false,
    false,
    false, // 25
    // stringOutput
    false,
    false,
    false,
    false,
    false,
    false,
    false, // 32
    false,
    false,
    false,
    false,
    false,
    false, // 38
    false,
    false,
    true,
    false,
    true,
    true,
    false, // 45
    false,
    false,
    false,
    false,
    false,
    false,
    true, // 52
  ],
  "false",
  false,
  "False",
);

it("Renders correctly", () => {
  getRendered(new BooleanType());
});

it("Set value correctly", () => {
  const onChange = jest.fn();
  getRendered(new BooleanType(), {
    rowData: { value: [] },
    onChange,
  });
  const input = screen.getByTestId("input_bool-checkbox");
  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(true);
});

it("Set value correctly (stringOutput)", () => {
  const onChange = jest.fn();
  getRendered(new BooleanType({ stringOutput: true }), {
    rowData: { value: [] },
    onChange,
  });
  const input = screen.getByTestId("input_bool-checkbox");
  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(true);
});
