export function extract(array, filter) {
  let ret = [],
    not = [];

  for (const element of array) {
    const item = element;
    (filter(item) ? ret : not).push(item);
  }

  return [ret, not];
}
