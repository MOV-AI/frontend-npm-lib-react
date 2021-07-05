import Graph from "./Graph";

test("test get neighbor", () => {
  const graph = new Graph();
  graph.addEdge(1, 2).addEdge(3, 1);
  expect(graph.getNeighbors(1)).toEqual(["2", "3"]);
});
