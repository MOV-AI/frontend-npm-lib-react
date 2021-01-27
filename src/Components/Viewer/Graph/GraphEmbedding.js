import Graph from "./Graph";
import RBush from "rbush";
import Constants from "../Utils/Constants";
import { Maybe } from "monet";
import Vec3 from "../Math/Vec3";

/**
 * Will be Deprecated
 */
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
  addVertex(i, iIndex = undefined) {
    const maybeVertexI = this.getVertex(i);
    maybeVertexI.orElseRun(() => {
      const vertexI = new RVertex(i, iIndex ? iIndex : this.vertexGenerator++);
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
      .getVertex(index)
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
        this.graph.getVertex(jId).forEach(vProp => {
          neighbors.push(vProp[GraphEmbedding.NAMESPACES.vertex]);
        });
      });
    });
    return neighbors;
  }

  updateVertex(vertexIndex, position) {
    this.graph.getVertex(vertexIndex).forEach(prop => {
      const rVertex = prop[GraphEmbedding.NAMESPACES.vertex];
      rVertex.position = position;
      this.rTreeVertices.remove(rVertex);
      this.rTreeVertices.insert(rVertex);
      this.graph.getNeighbors(vertexIndex).forEach(j => {
        this.graph.getEdge(vertexIndex, j).forEach(propEdge => {
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
      .getEdge(iIndex, jIndex)
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
  constructor(vertexPosition, vertexId, keyValueMap = {}) {
    this.position = vertexPosition;
    this.id = vertexId;
    this.props = {};
  }

  getProps() {
    return this.props;
  }

  setProps(props) {
    this.props = props;
  }

  toBBox(epsilon = Constants.RADIUS / 4) {
    const { position } = this;
    return {
      minX: position.x - epsilon,
      minY: position.y - epsilon,
      maxX: position.x + epsilon,
      maxY: position.y + epsilon
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
    this.props = {};
  }

  getProps() {
    return this.props;
  }

  setProps(props) {
    this.props = props;
  }

  equals(b) {
    if (!(b instanceof REdge)) return false;
    const bEdgeIds = b.edge.map(v => v.id);
    return this.edge
      .map(v => v.id)
      .map(id => bEdgeIds.includes(id))
      .every(x => x);
  }

  toBBox(epsilon = Constants.RADIUS / 4) {
    const { edge } = this;
    return {
      minX: edge.reduce(
        (e, v) => Math.min(e, v.position.x - epsilon),
        Number.MAX_VALUE
      ),
      minY: edge.reduce(
        (e, v) => Math.min(e, v.position.y - epsilon),
        Number.MAX_VALUE
      ),
      maxX: edge.reduce(
        (e, v) => Math.max(e, v.position.x + epsilon),
        Number.MIN_VALUE
      ),
      maxY: edge.reduce(
        (e, v) => Math.max(e, v.position.y + epsilon),
        Number.MIN_VALUE
      )
    };
  }

  importFeatures(rEdge, edgeMeshes) {
    this.weight = rEdge.weight;
    this.keyValueMap = { ...rEdge.keyValueMap };
    const [iMesh, jMesh] = edgeMeshes;
    this.props.belongsSrc = iMesh;
    this.props.belongsTrg = jMesh;
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
