import { Maybe } from "monet";

const Utils = {};

Utils.ofNull = x => Maybe.fromNull(x);

Utils.range = (init, end) => {
  const { i, e } = Maybe.fromNull(end)
    .map(x => ({ i: init, e: end }))
    .orSome({ i: 0, e: init });
  const ans = [];
  for (let j = i; j < e; j++) ans.push(j);
  return ans;
};

Utils.randomInt = (a, b) => Math.floor(Utils.random(a, b));

Utils.random = (a, b) => {
  const { init, end } = Maybe.fromNull(b)
    .map(x => ({ init: a, end: b }))
    .orSome({ init: 0, end: a });
  return init + (end - init) * Math.random();
};

Utils.normalizeStr = str => {
  // from https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

/**
 *
 * @param {*} array
 * @param {*} groupFunction : function x => group class;
 *
 * Usage example:
 *
 * groupBy([1,2,3,4,5,6,7,8,9], x => x % 3) // {0: [3,6,9], 1:[1,4,7], 2:[2,5,8]}
 */
Utils.groupBy = (array, groupFunction) => {
  const ans = {};
  array.forEach(x => {
    const key = groupFunction(x);
    if (!ans[key]) ans[key] = [];
    ans[key].push(x);
  });
  return ans;
};

export default Utils;
