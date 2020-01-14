import TreeObject from "../TreeObject";

const forest = [
  {
    name: "0",
    children: [
      {
        name: "00",
        children: []
      },
      {
        name: "01",
        children: []
      }
    ]
  },
  {
    name: "1",
    children: [
      {
        name: "10",
        children: []
      },
      {
        name: "11",
        children: []
      }
    ]
  }
];

const mappedForest = [
  {
    title: "0",
    children: [
      {
        title: "00",
        children: []
      },
      {
        title: "01",
        children: []
      }
    ]
  },
  {
    title: "1",
    children: [
      {
        title: "10",
        children: []
      },
      {
        title: "11",
        children: []
      }
    ]
  }
];

const differentForest = [
  {
    name: "0",
    children: [
      {
        name: "00",
        children: []
      },
      {
        name: "2",
        children: []
      }
    ]
  },
  {
    name: "1",
    children: [
      {
        name: "10",
        children: []
      },
      {
        name: "11",
        children: []
      }
    ]
  }
];

const anotherForest = [
  {
    name: "0",
    children: [
      {
        name: "00",
        children: []
      },
      {
        name: "01",
        children: []
      }
    ]
  },
  {
    name: "1",
    children: [
      {
        name: "10",
        children: []
      },
      {
        name: "3",
        children: []
      }
    ]
  }
];

test("test find node in tree", () => {
  expect(new TreeObject(forest).getNode(x => x.name === "1").some()).toEqual(
    forest[1]
  );
  expect(new TreeObject(forest).getNode(x => x.name === "10").some()).toEqual(
    forest[1].children[0]
  );
});

test("test find parent node in tree", () => {
  expect(
    new TreeObject(forest).getParentNode(x => x.name === "10").some()
  ).toEqual(forest[1]);
  expect(
    new TreeObject(forest).getParentNode(x => x.name === "00").some()
  ).toEqual(forest[0]);
});

test("test tree equality", () => {
  expect(
    new TreeObject(forest).equals(forest, (a, b) => a.name === b.name)
  ).toBeTruthy();
});

test("test not equal tree", () => {
  expect(
    new TreeObject(forest).equals(differentForest, (a, b) => a.name === b.name)
  ).toBeFalsy();
  expect(
    new TreeObject(forest).equals(anotherForest, (a, b) => a.name === b.name)
  ).toBeFalsy();
});

test("test mapped tree", () => {
  const mappedTree = new TreeObject(forest).map(x => {
    return { title: x.name };
  });
  expect(
    mappedTree.equals(mappedForest, (a, b) => a.title === b.title)
  ).toBeTruthy();
});
