import NumberType from "./ArrayType";
import { testValidation, testStringInput } from "../testUtils";

testValidation(
  NumberType,
  [
    false,
    true,
    true,
    false,
    false,
    false,
    false, // 6
    false,
    false,
    false,
    true,
    true,
    true, // 12
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
    true,
    true,
    false,
    false,
    false,
    false, // 45
    false,
    false,
    false,
    true,
    true,
    true,
    true, // 52
  ],
  "1",
  1,
);

testStringInput(NumberType, "a", null);
testStringInput(NumberType, "1", 1);
