import ObjectType from "./ObjectType";
import { testValidation, testStringInput } from "../testUtils";

testValidation(
  ObjectType,
  [
    true,
    false,
    true,
    false,
    false,
    false,
    false, // 6
    true,
    true,
    true,
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
    true,
    false,
    true,
    false,
    false,
    false,
    false, // 45
    true,
    true,
    true,
    false,
    false,
    false,
    true, // 52
  ],
  '{"hi":1}',
  { hi: 1 },
);

testStringInput(ObjectType, '{ "hi"', null);
testStringInput(ObjectType, '{ "hi":1 }', { hi: 1 });
