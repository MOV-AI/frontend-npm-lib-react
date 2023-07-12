import "@testing-library/jest-dom";
import { findsUniqueKey } from "./Utils";

test("test findsUniqueKey", () => {
  const array = [
    { key: 0, label: "Chip1" },
    { key: 2, label: "Chip3" }
  ];
  const keyName = "key";
  expect(findsUniqueKey(array, keyName)).toStrictEqual(1);
  const array2 = [
    { key: 0, label: "Chip1" },
    { key: 1, label: "Chip3" }
  ];
  expect(findsUniqueKey(array2, keyName)).toStrictEqual(2);
});
