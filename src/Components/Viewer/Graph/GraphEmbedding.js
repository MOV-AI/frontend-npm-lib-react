import Graph from "./Graph";
import RBush from "rbush";
import Constants from "../Utils/Constants";
import { Maybe } from "monet";
import Vec3 from "../Math/Vec3";
import Util3d from "../Util3d/Util3d";

export default class GraphEmbedding {
  constructor() {
    this.graph = new Graph();
    this.rTreeVertices = new RTreeVertices();
    this.rTreeEdges = new RTreeEdges();
    this.vertexGenerator = 0;
  }

  //========================================================================================
  /*                                                                                      *
   *                                      Public API                                      *
   *                                                                                      */
  //========================================================================================

  getAbstractGraph() {
    return this.graph;
  }

  getAdjMap() {
    return this.graph.getAdjMap();
  }

  /**
   *
   * @param {*} i: Vector3
   * @param {*} iIndex: integer representing index of vertex i (can be undefined)
   *
   */
  addVertex(i, iIndex, isCurve = false) {
    const maybeVertexI = this.getVertex(i);
    maybeVertexI.orElseRun(() => {
      const vertexI = new RVertex(
        i,
        iIndex ? iIndex : this.vertexGenerator++,
        isCurve
      );
      this.rTreeVertices.insert(vertexI);
      this.graph.addVertex(vertexI.id);
      this.graph.setVertexProp(vertexI.id, {
        [GraphEmbedding.NAMESPACES.vertex]: vertexI
      });
    });
  }

  /**
   *
   * @param {*} i: Vector3
   */
  delVertex(i) {
    this.getVertex(i).forEach(rVertex => {
      const { id } = rVertex;
      this.rTreeVertices.remove(rVertex);
      this.graph.delVertex(id);
    });
  }

  addEdge(edge, edgeIndexes = []) {
    const [i, j] = edge;
    const [iIndex, jIndex] = edgeIndexes;
    this.addVertex(i, iIndex);
    this.addVertex(j, jIndex);
    this.getVertex(i).forEach(rVertexI =>
      this.getVertex(j).forEach(rVertexJ => {
        const edgeIJ = this.getEdgeByIndex(rVertexI.id, rVertexJ.id).orLazy(
          () => new REdge(rVertexI, rVertexJ)
        );
        const edgeJI = this.getEdgeByIndex(rVertexJ.id, rVertexI.id).orLazy(
          () => new REdge(rVertexJ, rVertexI)
        );

        this.rTreeEdges.remove(edgeIJ, (a, b) => a.equals(b));
        this.rTreeEdges.insert(edgeIJ);

        this.graph.addEdge(rVertexI.id, rVertexJ.id);

        //add edge properties
        this.graph.setEdgeProp(rVertexI.id, rVertexJ.id, {
          [GraphEmbedding.NAMESPACES.edge]: edgeIJ
        });
        this.graph.setEdgeProp(rVertexJ.id, rVertexI.id, {
          [GraphEmbedding.NAMESPACES.edge]: edgeJI
        });
      })
    );
    return this;
  }

  /**
   *
   * @param {*} i: Vector3 Position of vertex
   * @param {*} j: Vector3 Position of vertex
   */
  delEdge(i, j) {
    this.getEdge(i, j).forEach(rEdge => {
      const indexes = rEdge.edge.map(v => v.id);
      this.graph.delEdge(...indexes);
      this.rTreeEdges.remove(rEdge, (a, b) => a.equals(b));
    });
  }

  /**
   *
   * @param {*} i: Vector3 Position of vertex
   * @param {*} j: Vector3 Position of vertex
   */
  hasEdge(i, j) {
    return this.getVertex(i)
      .flatMap(rVertexI =>
        this.getVertex(j).map(rVertexJ =>
          this.graph.hasEdge(rVertexI.id, rVertexJ.id)
        )
      )
      .orSome(false);
  }

  /**
   *
   * @param {*} i: Vector3 Position of vertex
   */
  getVertex(i) {
    const queryArray = this.rTreeVertices.search(RVertex.of(i).toBBox());
    if (queryArray.length > 0) {
      return Maybe.some(
        queryArray.length > 1
          ? this.getMinDistanceVertex(queryArray, i)
          : queryArray[0]
      );
    }
    return Maybe.none();
  }

  getVertexByIndex = index => {
    return this.graph
      .getVertexProp(index)
      .flatMap(vertexProp =>
        Maybe.fromNull(vertexProp[GraphEmbedding.NAMESPACES.vertex])
      );
  };

  /**
   *
   * @param {*} i: Vector3 Position of vertex
   *
   * Returns Array<RVertex>
   */
  getNeighbors(i) {
    const neighbors = [];
    this.getVertex(i).forEach(rVertex => {
      this.graph.getNeighbors(rVertex.id).forEach(jId => {
        this.graph.getVertexProp(jId).forEach(vProp => {
          neighbors.push(vProp[GraphEmbedding.NAMESPACES.vertex]);
        });
      });
    });
    return neighbors;
  }

  updateVertex(vertexIndex, position) {
    this.graph.getVertexProp(vertexIndex).forEach(prop => {
      const rVertex = prop[GraphEmbedding.NAMESPACES.vertex];
      rVertex.position = position;
      this.rTreeVertices.remove(rVertex);
      this.rTreeVertices.insert(rVertex);
      this.graph.getNeighbors(vertexIndex).forEach(j => {
        this.graph.getEdgeProp(vertexIndex, j).forEach(propEdge => {
          const rEdge = propEdge[GraphEmbedding.NAMESPACES.edge];
          this.rTreeEdges.remove(rEdge, (a, b) => a.equals(b));
          // rEdge has a pointer to the already altered rVertex
          this.rTreeEdges.insert(rEdge);
        });
      });
    });
  }

  /**
   *
   * @param {*} i: Vector3 Position of vertex
   * @param {*} j: Vector3 Position of vertex
   */
  getEdge(i, j) {
    const queryPoint = j ? i.add(j).scale(0.5) : i;
    const queryArray = this.rTreeEdges.search(RVertex.of(queryPoint).toBBox());
    if (queryArray.length > 0) {
      return Maybe.some(
        queryArray.length > 1
          ? this.getMinDistanceEdge(queryArray, queryPoint)
          : queryArray[0]
      );
    }
    return Maybe.none();
  }

  getEdgeByIndex(iIndex, jIndex) {
    return this.graph
      .getEdgeProp(iIndex, jIndex)
      .map(edgeProp => edgeProp[GraphEmbedding.NAMESPACES.edge]);
  }

  /**
   *
   * @param {*} rEdges: Array<REdge>
   * @param {*} queryPoint: Vector3
   */
  getMinDistanceEdge(rEdges, queryPoint) {
    let minDist = Number.MAX_VALUE;
    let minDistIndex = -1;
    rEdges.forEach((rEdge, i) => {
      const edge = rEdge.edge.map(v => v.position).map(Vec3.ofBabylon);
      const e = edge[1].sub(edge[0]);
      const x = Vec3.ofBabylon(queryPoint).sub(edge[0]);
      const dot = e.dot(x) / e.dot(e);
      const dist = x.sub(e.scale(dot)).length();
      if (minDist > dist) {
        minDist = dist;
        minDistIndex = i;
      }
    });
    return rEdges[minDistIndex];
  }

  getMinDistanceVertex(rVertices, queryPoint) {
    let minDist = Number.MAX_VALUE;
    let minDistIndex = -1;
    rVertices.forEach((rVertex, i) => {
      const vp = Vec3.ofBabylon(rVertex.position);
      const x = Vec3.ofBabylon(queryPoint);
      const dist = vp.sub(x).length();
      if (minDist > dist) {
        minDist = dist;
        minDistIndex = i;
      }
    });
    return rVertices[minDistIndex];
  }

  getVertices() {
    return this.graph.getVertices();
  }

  getEdges() {
    return this.graph.getEdges();
  }

  /**
   *
   * @param {*} data: {adjMap, vertices, edges}
   */
  importData(data) {
    const { adjMap } = data;
    // add vertices data
    // add edges data
    const vertices = { ...data.vertices };
    const edges = { ...data.edges };
    Object.keys(adjMap).forEach(i => {
      Object.keys(adjMap[i]).forEach(j => {
        const dataVertexI = vertices[i];
        const dataVertexJ = vertices[j];
        const dataEdgeIJ = edges[Graph.edgeKey(i, j)];
        this.graph.getVertexProp(i).forEach(prop => {
          prop[GraphEmbedding.NAMESPACES.vertex].keyValueMap =
            dataVertexI.keyValueMap;
        });
        this.graph.getVertexProp(j).forEach(prop => {
          prop[GraphEmbedding.NAMESPACES.vertex].keyValueMap =
            dataVertexJ.keyValueMap;
        });
        this.graph.getEdgeProp(i, j).forEach(prop => {
          const rEdge = prop[GraphEmbedding.NAMESPACES.edge];
          rEdge.keyValueMap = dataEdgeIJ.keyValueMap;
          rEdge.weight = dataEdgeIJ.weight;
        });
      });
    });
    this.vertexGenerator = data.vertexGenerator;
  }

  //========================================================================================
  /*                                                                                      *
   *                                   Static Functions                                   *
   *                                                                                      */
  //========================================================================================

  static NAMESPACES = {
    vertex: "rVertex",
    edge: "rEdge"
  };
}

/**
 * Should be Immutable vertex object
 */
class RVertex {
  constructor(vertexPosition, vertexId, isCurve, keyValueMap = {}) {
    this.position = vertexPosition;
    this.id = vertexId;
    this.keyValueMap = keyValueMap;
    this.isCurve = isCurve;
  }

  toBBox() {
    const { position } = this;
    return {
      minX: position.x - Constants.RADIUS / 4,
      minY: position.y - Constants.RADIUS / 4,
      maxX: position.x + Constants.RADIUS / 4,
      maxY: position.y + Constants.RADIUS / 4
    };
  }

  static of(position) {
    return new RVertex(position);
  }
}

class RTreeVertices extends RBush {
  toBBox(rVertex) {
    return rVertex.toBBox();
  }

  compareMinX(a, b) {
    return a.position.x - b.position.x;
  }
  compareMinY(a, b) {
    return a.position.y - b.position.y;
  }
}

class REdge {
  constructor(rVertexI, rVertexJ, keyValueMap = {}) {
    this.edge = [rVertexI, rVertexJ];
    this.keyValueMap = keyValueMap;
    this.weight = 1.0;
  }

  equals(b) {
    if (!(b instanceof REdge)) return false;
    const bEdgeIds = b.edge.map(v => v.id);
    return this.edge
      .map(v => v.id)
      .map(id => bEdgeIds.includes(id))
      .every(x => x);
  }

  toBBox() {
    const { edge } = this;
    return {
      minX: edge.reduce(
        (e, v) => Math.min(e, v.position.x - Constants.RADIUS / 4),
        Number.MAX_VALUE
      ),
      minY: edge.reduce(
        (e, v) => Math.min(e, v.position.y - Constants.RADIUS / 4),
        Number.MAX_VALUE
      ),
      maxX: edge.reduce(
        (e, v) => Math.max(e, v.position.x + Constants.RADIUS / 4),
        Number.MIN_VALUE
      ),
      maxY: edge.reduce(
        (e, v) => Math.max(e, v.position.y + Constants.RADIUS / 4),
        Number.MIN_VALUE
      )
    };
  }

  static of(vertexPosI, vertexPosJ) {
    return new REdge(RVertex.of(vertexPosI), RVertex.of(vertexPosJ));
  }
}

class RTreeEdges extends RBush {
  toBBox(rEdge) {
    return rEdge.toBBox();
  }

  compareMinX(a, b) {
    const aMin = a.toBBox().minX;
    const bMin = b.toBBox().minX;
    return aMin - bMin;
  }

  compareMinY(a, b) {
    const aMin = a.toBBox().minY;
    const bMin = b.toBBox().minY;
    return aMin - bMin;
  }
}
