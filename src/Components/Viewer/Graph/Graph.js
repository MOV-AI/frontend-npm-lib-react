import { Maybe } from "monet";

/**
 * Undirected Graph data structure
 */
class Graph {
  #adjMap = {};
  #vertices = {};
  #edges = {};

  //========================================================================================
  /*                                                                                      *
   *                                      Public API                                      *
   *                                                                                      */
  //========================================================================================

  addVertex(i) {
    if (!(i in this.#vertices)) {
      this.#vertices[i] = {};
      this.#adjMap[i] = {};
    }
  }

  delVertex(i) {
    if (i in this.#vertices) {
      delete this.#vertices[i];
      // delete neighbors edge properties
      Object.keys(this.#adjMap[i]).forEach(j => {
        delete this.#edges[Graph.edgeKey(i, j)];
        delete this.#edges[Graph.edgeKey(j, i)];
      });
      delete this.#adjMap[i];
      Object.keys(this.#adjMap).forEach(j => {
        if (i in this.#adjMap[j]) {
          delete this.#adjMap[j][i];
        }
      });
    }
  }

  /**
   *
   * If edge already exists, this function overwrites previous edge
   *
   * @param {*} i: vertex id
   * @param {*} j: vertex id
   */
  addEdge(i, j) {
    this.addVertex(i);
    this.addVertex(j);
    this.#edges[Graph.edgeKey(i, j)] = {};
    this.#edges[Graph.edgeKey(j, i)] = {};
    this.#adjMap[i][j] = true;
    this.#adjMap[j][i] = true;
    return this;
  }

  delEdge(i, j) {
    const ijKey = Graph.edgeKey(i, j);
    const jiKey = Graph.edgeKey(j, i);
    if (ijKey in this.#edges || jiKey in this.#edges) {
      delete this.#edges[ijKey];
      delete this.#edges[jiKey];
      delete this.#adjMap[i][j];
      delete this.#adjMap[j][i];
    }
  }

  hasEdge(i, j) {
    return this.getEdgeProp(i, j).isSome();
  }

  getNeighbors(i) {
    if (i in this.#adjMap) return Object.keys(this.#adjMap[i]);
    return [];
  }

  getEdgeProp(i, j) {
    const edgeKey = Graph.edgeKey(i, j);
    if (edgeKey in this.#edges) {
      return Maybe.some(this.#edges[edgeKey]);
    }
    return Maybe.none();
  }

  setEdgeProp(i, j, props) {
    const edgeKey = Graph.edgeKey(i, j);
    if (edgeKey in this.#edges) {
      this.#edges[edgeKey] = props;
    }
    return this;
  }

  getVertexProp(i) {
    if (i in this.#vertices) {
      return Maybe.some(this.#vertices[i]);
    }
    return Maybe.none();
  }

  setVertexProp(i, props) {
    if (i in this.#vertices) {
      this.#vertices[i] = props;
    }
    return this;
  }

  getEdges() {
    return this.#edges;
  }

  getVertices() {
    return this.#vertices;
  }

  getAdjMap() {
    return this.#adjMap;
  }

  setAdjacentMap(adjMap) {
    this.#adjMap = adjMap;
  }

  setVertices(vertices) {
    this.#vertices = vertices;
  }

  setEdges(edges) {
    this.#edges = edges;
  }

  static edgeKey = (i, j) => `${i}_${j}`;
  static key2Edge = key => key.split("_");
}

export default Graph;
