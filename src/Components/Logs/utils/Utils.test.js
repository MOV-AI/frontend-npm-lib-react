import {
  findsUniqueKey,
  getRequestLevels,
  getRequestTags,
  getRequestMessage,
  getTimeFromServer,
  getJustDateFromServer,
  getJustTimeFromServer
} from "./Utils";

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

test("test getRequestLevels", () => {
  const levelsArray = ["INFO", "DEBUG"];
  expect(getRequestLevels(undefined)).toStrictEqual("");
  expect(getRequestLevels("")).toStrictEqual("");
  expect(getRequestLevels(levelsArray)).toStrictEqual("&level=info,debug");
  const levels = ["INFO", "WARNING", "DEBUG", "ERROR", "CRITICAL"];
  expect(getRequestLevels(levels, levels)).toStrictEqual("");
});

test("test getRequestTags", () => {
  const tagsArray = [
    { key: 0, label: "UI" },
    { key: 1, label: "TASKS" }
  ];
  expect(getRequestTags(tagsArray)).toStrictEqual("&tags=UI,TASKS");
  expect(getRequestTags([])).toStrictEqual("");
  expect(getRequestTags({})).toStrictEqual("");
  expect(getRequestTags(undefined)).toStrictEqual("");
});

test("test getRequestMessage", () => {
  expect(getRequestMessage("")).toStrictEqual("");
  expect(getRequestMessage(undefined)).toStrictEqual("");
  expect(getRequestMessage("ahah")).toStrictEqual("&message=ahah");
});

// test("test getTimeFromServer", () => {
//   expect(getTimeFromServer(1586370146)).toStrictEqual("08/04/2020 19:22:26");
// });

// test("test getJustDateFromServer", () => {
//   expect(getJustDateFromServer(1586370146)).toStrictEqual("08/04/2020");
// });

// test("test getJustTimeFromServer", () => {
//   expect(getJustTimeFromServer(1586370146)).toStrictEqual("19:22:26");
// });
