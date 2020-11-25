import NodeItem from "./NodeItem";
import Util3d from "../Util3d/Util3d";
import { Color3, Vector3, Observable, Curve3 } from "@babylonjs/core";
import Constants from "../Utils/Constants";
import { Quaternion } from "@babylonjs/core/Maths/math";
import GraphEmbedding from "../Graph/GraphEmbedding";
import Graph from "../Graph/Graph";
import Vec3 from "../Math/Vec3";
import { Maybe } from "monet";
import React from "react";
import _get from "lodash/get";
import { UndoManager } from "mov-fe-lib-core";

/**
 * One graph per scene
 */
class GraphItem extends NodeItem {
  constructor(scene, mainView, name = GraphItem.NAME, keyValueMap = {}) {
    const sceneId = scene.getUniqueId();
    // super() must be called before using _this_.
    if (
      sceneId in graphItemInstances &&
      !graphItemInstances[sceneId].mesh.isDisposed()
    ) {
      return graphItemInstances[sceneId];
    }

    const graphPlaceHolder = getGraphPlaceHolder(scene, name);
    graphPlaceHolder.onClick = () =>
      (this.graphFormMapper = this.getDefaultFormMapper());

    super(graphPlaceHolder, keyValueMap);
    graphItemInstances[sceneId] = this;

    // object properties
    this.graph = new GraphEmbedding();
    this.scene = scene;
    this.mainView = mainView;
    this.meshByEdgeId = {};
    this.meshByVertexId = {};
    this.graphFormMapper = this.getDefaultFormMapper();
  }

  getType = () => GraphItem.TYPE;

  toDict() {
    const dict = super.toDict();
    const adjMap = this.graph.getAdjMap();
    const vertices = { ...this.graph.getVertices() };
    const edges = { ...this.graph.getEdges() };

    Object.keys(vertices).forEach(k => {
      this.graph
        .getVertexByIndex(k)
        .forEach(({ position, id, keyValueMap }) => {
          vertices[k] = {
            position: Vec3.ofBabylon(position).toArray(),
            id: id,
            keyValueMap: keyValueMap
          };
        });
    });

    Object.keys(edges).forEach(k => {
      const ids = Graph.key2Edge(k);
      this.graph
        .getEdgeByIndex(...ids)
        .forEach(({ edge, keyValueMap, weight }) => {
          edges[k] = {
            ids: ids,
            positions: edge.map(({ position }) =>
              Vec3.ofBabylon(position).toArray()
            ),
            keyValueMap: keyValueMap,
            weight: weight,
            isCurve: edge.map(v => v.isCurve)
          };
        });
    });

    dict["adjMap"] = adjMap;
    dict["vertices"] = vertices;
    dict["edges"] = edges;
    dict["vertexGenerator"] = this.graph.vertexGenerator;
    return dict;
  }

  toForm() {
    const form = super.toForm();
    delete form.jsonSchema.properties.position;
    delete form.jsonSchema.properties.quaternion;
    delete form.jsonSchema.properties.color;
    delete form.uiSchema.position;
    delete form.uiSchema.quaternion;
    delete form.uiSchema.color;
    delete form.data.position;
    delete form.data.quaternion;
    delete form.data.color;
    return this.graphFormMapper.toForm(form);
  }

  ofForm(form) {
    this.name = form.name;
    this.mesh.name = form.name;
    this.graphFormMapper.ofForm(form);
  }

  getDefaultFormMapper() {
    return {
      toForm: form => form,
      ofForm: form => (this.keyValueMap = { ...form.annotations })
    };
  }

  getToFormVertex(vertexMesh) {
    return {
      toForm: form =>
        this.graph
          .getVertex(vertexMesh.position)
          .map(rVertex => {
            form.jsonSchema.properties["positionVertex"] = {
              type: "object",
              title: `Position Vertex ${rVertex.id}`,
              properties: {
                x: {
                  type: "number",
                  title: "x"
                },
                y: {
                  type: "number",
                  title: "y"
                },
                z: {
                  type: "number",
                  title: "z"
                }
              }
            };

            form.uiSchema["positionVertex"] = {
              "ui:widget": "collapse"
            };

            form.data["positionVertex"] = {
              x: vertexMesh.position.x,
              y: vertexMesh.position.y,
              z: vertexMesh.position.z
            };
            NodeItem.setAnnotations2Form(form, rVertex.keyValueMap);
            form.jsonSchema.properties[
              "annotations"
            ].title = `Annotations Vertex ${rVertex.id}`;
            return form;
          })
          .orSome(form),
      ofForm: form => {
        let position = _get(form, "positionVertex", vertexMesh.position);
        position = [position.x, position.y, position.z].map(Number.parseFloat);
        this.graph
          .getVertex(vertexMesh.position)
          .forEach(
            rVertex =>
              (rVertex.keyValueMap = { ..._get(form, "annotations", {}) })
          );
        this.updateVertexPosition(
          vertexMesh.vertexId,
          Vector3.FromArray(position),
          false
        );
      }
    };
  }

  getToFormEdge(edgeMesh) {
    return {
      toForm: form => {
        const edgePositions = edgeMesh.edgeIndexes
          .map(index =>
            Maybe.fromNull(this.meshByVertexId[index]).map(
              mesh => mesh.position
            )
          )
          .filter(maybe => maybe.isSome())
          .map(maybe => maybe.some());
        console.log("FORM2EDGE", edgePositions);
        if (edgePositions.length === 0) return form;
        return this.graph
          .getEdge(edgePositions[0], edgePositions[1])
          .map(rEdge => {
            form.jsonSchema.properties["positionEdge"] = {
              type: "object",
              title: `Position Edge ${edgeMesh.edgeIndexes}`,
              properties: {
                x: {
                  type: "number",
                  title: "x"
                },
                y: {
                  type: "number",
                  title: "y"
                },
                z: {
                  type: "number",
                  title: "z"
                }
              }
            };
            form.jsonSchema.properties["weight"] = {
              type: "number",
              title: "Weight"
            };

            form.uiSchema["positionEdge"] = {
              "ui:widget": "collapse"
            };

            const meanPoint = Util3d.pointAverage(edgePositions);
            form.data["positionEdge"] = {
              x: meanPoint.x,
              y: meanPoint.y,
              z: meanPoint.z
            };
            form.data["weight"] = rEdge.weight;
            NodeItem.setAnnotations2Form(form, rEdge.keyValueMap);
            form.jsonSchema.properties[
              "annotations"
            ].title = `Annotations Edge ${edgeMesh.edgeIndexes}`;
            return form;
          })
          .orSome(form);
      },
      ofForm: form => {
        const { edgeIndexes } = edgeMesh;

        //update edges positions
        const edgePositions = edgeIndexes.map(
          index => this.meshByVertexId[index].position
        );
        const edgePosition = Util3d.pointAverage(edgePositions);
        let newEdgePosition = _get(form, "positionEdge", edgePosition);
        newEdgePosition = [
          newEdgePosition.x,
          newEdgePosition.y,
          newEdgePosition.z
        ].map(Number.parseFloat);
        newEdgePosition = Vector3.FromArray(newEdgePosition);
        edgePositions.forEach((vertexPos, i) =>
          this.updateVertexPosition(
            edgeIndexes[i],
            vertexPos.add(newEdgePosition.subtract(edgePosition)),
            false
          )
        );

        const updateEdgeFromForm = rEdge => {
          rEdge.keyValueMap = { ..._get(form, "annotations", {}) };
          rEdge.weight = Number.parseFloat(form.weight);
        };
        this.graph
          .getEdgeByIndex(edgeIndexes[0], edgeIndexes[1])
          .forEach(updateEdgeFromForm);
        this.graph
          .getEdgeByIndex(edgeIndexes[1], edgeIndexes[0])
          .forEach(updateEdgeFromForm);
      }
    };
  }

  //========================================================================================
  /*                                                                                      *
   *                                   Graph Operations                                   *
   *                                                                                      */
  //========================================================================================

  addEdge(edge, edgeIndexes = [], isEdgeCurve = [false, false]) {
    const [i, j] = edge;
    const [iIndex, jIndex] = edgeIndexes;
    const [iIsCurve, jIsCurve] = isEdgeCurve;
    if (this.hasEdge(i, j)) return;
    this.buildVertex(i, iIndex, iIsCurve);
    this.buildVertex(j, jIndex, jIsCurve);
    this.buildEdge(i, j);
    return this;
  }

  addCurveEdge(edge) {
    const points = GraphItem.getCurveEdgePoints(edge, 0.75);
    for (let i = 0; i < points.length - 1; i++) {
      const partialEdge = [points[i], points[i + 1]];
      this.addEdge(partialEdge, [], [i !== 0, i !== points.length - 2]);
    }
    return this;
  }

  delEdge(i, j) {
    //Warning: multiple call of getEdge, check for optimization
    this.graph.getEdge(i, j).forEach(({ edge }) => {
      const ids = edge.map(v => v.id);
      const ijKey = Graph.edgeKey(ids[0], ids[1]);
      const jiKey = Graph.edgeKey(ids[1], ids[0]);
      Maybe.fromNull(this.meshByEdgeId[ijKey]).forEach(mesh => mesh.dispose());
      delete this.meshByEdgeId[ijKey];
      delete this.meshByEdgeId[jiKey];
      this.graph.delEdge(...edge.map(e => e.position));

      // remove vertex if have no neighbors
      const abstractGraph = this.graph.getAbstractGraph();
      edge.forEach(({ id, position }) => {
        const neighbors = abstractGraph.getNeighbors(id);
        if (neighbors.length === 0) {
          this.delVertex(position);
        }
      });
    });
  }

  delCurveEdge(edge) {
    const points = GraphItem.getCurveEdgePoints(edge, 0.75);
    for (let k = 0; k < points.length - 1; k++) {
      const [i, j] = [points[k], points[k + 1]];
      this.delEdge(i, j);
    }
    return this;
  }

  /**
   *
   * @param {*} i: Vector3
   * @param {*} j: Vector3
   */
  hasEdge(i, j) {
    return this.graph.hasEdge(i, j);
  }

  //========================================================================================
  /*                                                                                      *
   *                                    Private Methods                                   *
   *                                                                                      */
  //========================================================================================

  /**
   *
   * @param {*} vertex: Vector3
   * @param {*} vertexIndex: integer representing index of vertex (can be undefined)
   *
   */
  buildVertex(vertex, vertexIndex, isCurve = false) {
    if (this.doesVertexCollideWithEdge(vertex)) {
      this.resolveVertexEdgeCollision(vertex);
    }
    this.buildSimpleVertex(vertex, vertexIndex, isCurve);
  }

  buildSimpleVertex(vertex, vertexIndex, isCurve = false) {
    const maybeVertex = this.graph.getVertex(vertex);
    maybeVertex.forEach(rVertex => {
      const { isCurve, id } = rVertex;
      if (isCurve) {
        const degree = this.graph.getAbstractGraph().getNeighbors(id).length;
        if (degree >= 2) {
          rVertex.isCurve = false;
          this.meshByVertexId[rVertex.id].dispose();
          this.createVertexMesh(rVertex);
        }
      }
    });
    maybeVertex.orElseRun(() => {
      // if vertex doesn't exist
      this.graph.addVertex(vertex, vertexIndex, isCurve);
      this.graph.getVertex(vertex).forEach(this.createVertexMesh);
    });
  }

  createVertexMesh = rVertex => {
    const { isCurve } = rVertex;
    const vertexMesh = GraphItem.getVertexMesh(
      this.scene,
      rVertex.position,
      isCurve ? Color3.Blue() : Color3.Gray(),
      isCurve ? (2 * Constants.RADIUS) / 3 : Constants.RADIUS
    );
    vertexMesh.parent = this.mesh;
    vertexMesh.vertexId = rVertex.id;
    this.addObserver2VertexMesh(vertexMesh);
    this.addOnClickVertex(vertexMesh);
    this.meshByVertexId[rVertex.id] = vertexMesh;
  };

  /**
   * Side effect function beware
   */
  addObserver2VertexMesh(vertexMesh) {
    vertexMesh.observers = new Observable();
    vertexMesh.observers.add(this.getVertexObs());
  }

  getVertexObs = () => ({ updatedPointMesh, is2updateServer }) => {
    const position = updatedPointMesh.position;
    const id = updatedPointMesh.vertexId;
    this.updateVertexPosition(id, position, is2updateServer);
    this.updateCurvedNeighbors([id], is2updateServer);
    if (is2updateServer) {
      this.graphFormMapper = this.getToFormVertex(updatedPointMesh);
      this.mainView.setProperties(this.toForm());
    }
  };

  updateCurvedNeighbors(movedVertexIds, is2updateServer) {
    this.getCurvedNeighbors(movedVertexIds)
      .map(({ id, position }) => ({
        id,
        position: this.heatFlow(id, position)
      }))
      .forEach(({ id, position }) =>
        this.updateVertexPosition(id, position, is2updateServer)
      );
  }

  getCurvedNeighbors(vertexIds) {
    const result = [];
    const visitedVertex = {};
    vertexIds.forEach(id => (visitedVertex[id] = true));
    const abstractGraph = this.graph.getAbstractGraph();
    const vertexStack = vertexIds
      .map(id => abstractGraph.getNeighbors(id))
      .flatMap(n => n)
      .filter(id => !(id in visitedVertex));
    while (vertexStack.length > 0) {
      const u = vertexStack.pop();
      visitedVertex[u] = true;
      this.graph.getVertexByIndex(u).forEach(rVertex => {
        const { isCurve, id } = rVertex;
        if (isCurve) {
          result.push(rVertex);
          vertexStack.push(
            ...abstractGraph.getNeighbors(id).filter(j => !(j in visitedVertex))
          );
        }
      });
    }
    return result;
  }

  heatFlow(id, position) {
    const dt = 0.1;
    const abstractGraph = this.graph.getAbstractGraph();
    const neighbors = abstractGraph
      .getNeighbors(id)
      .map(this.graph.getVertexByIndex)
      .filter(m => m.isSome())
      .map(m => m.some())
      .map(v => v.position);
    const x = position;
    const df = x
      .scale(neighbors.length)
      .subtract(neighbors.reduce((e, v) => e.add(v), Vector3.Zero()));
    return x.add(df.scale(-dt));
  }

  addOnClickVertex(vertexMesh) {
    vertexMesh.onClick = () => {
      const actions = [];
      actions.push({
        icon: props => <i className="fas fa-trash" {...props}></i>,
        action: () => {
          this.mainView
            .getUndoManager()
            .doIt(this.getUndoDeleteVertex(vertexMesh));
        },
        name: "Delete Node [Del]"
      });
      this.mainView.setContextActions(actions);
    };
  }

  getUndoDeleteVertex(vertexMesh) {
    const p = vertexMesh.position;
    const id = vertexMesh.vertexId;
    const rVertex = this.graph.getVertexByIndex(id).some();
    const isCurve = rVertex.isCurve;
    const neigh = this.graph.getNeighbors(rVertex.position);
    const simpleNeigh = neigh.filter(x => !x.isCurve);
    const curveNeigh = neigh.filter(x => x.isCurve);
    const curvedPaths = curveNeigh.map(v =>
      this.graph.getCurvedPathFromVertex(v.position)
    );
    return UndoManager.actionBuilder()
      .doAction(() => {
        if (!isCurve)
          simpleNeigh.forEach(v => {
            this.delEdge(p, v.position);
          });
        curvedPaths.forEach(path => {
          for (let i = 0; i < path.length - 1; i++) {
            this.delEdge(path[i].position, path[i + 1].position);
          }
        });
        this.mainView.closeContextDial();
        this.mainView.updateNodeInServer(this.name);
      })
      .undoAction(() => {
        if (!isCurve)
          simpleNeigh.forEach(v => {
            this.addEdge([p, v.position], [id, v.id]);
          });
        curvedPaths.forEach(path => {
          for (let i = 0; i < path.length - 1; i++) {
            const edge = [path[i], path[i + 1]];
            const edgeIndexes = edge.map(({ id }) => id);
            const edgePos = edge.map(({ position }) => position);
            const edgeIsCurve = edge.map(({ isCurve }) => isCurve);
            this.addEdge(edgePos, edgeIndexes, edgeIsCurve);
          }
        });
        this.mainView.updateNodeInServer(this.name);
      })
      .build();
  }

  highlightCurveEdge(vertexId) {
    const meshes = this.getCurvedNeighbors([vertexId]).map(
      ({ id }) => this.meshByVertexId[id]
    );
    this.mainView.highlightMeshesInScene(meshes);
  }

  delVertex(i) {
    this.graph.getVertex(i).forEach(({ id }) => {
      const neighbors = this.graph.getNeighbors(i);
      neighbors.forEach(({ position }) => this.delEdge(i, position));
      Maybe.fromNull(this.meshByVertexId[id]).forEach(mesh => mesh.dispose());
      delete this.meshByVertexId[id];
      this.graph.delVertex(i);
      // delete neighbor if belong to curve
      neighbors
        .filter(({ isCurve }) => isCurve)
        .forEach(({ position }) => this.delVertex(position));
    });
  }

  /**
   *
   * @param {*} id: vertex to be updated id
   * @param {*} newPosition: Vector3, new vertex position
   * @param {*} is2updateServer: is to update in server boolean var
   * @param {*} protectEdge: Pair<Int> with vertex indices
   */
  updateVertexPosition(
    id,
    newPosition,
    is2updateServer = true,
    protectEdge = []
  ) {
    this.meshByVertexId[id].position = newPosition; // redundant when called from addObserver2VertexMesh
    this.graph.updateVertex(id, newPosition);
    this.graph.getNeighbors(newPosition).forEach(rVertex => {
      const i = id;
      const j = rVertex.id;
      if (!this.isEdgeInPair(i, j, protectEdge)) {
        this.meshByEdgeId[Graph.edgeKey(i, j)].dispose();
        this.graph.getEdgeByIndex(i, j).forEach(rEdge => {
          this.buildEdge(newPosition, rVertex.position);
        });
      }
      if (is2updateServer) this.mainView.updateNodeInServer(this.name);
    });
  }

  isEdgeInPair(iIndex, jIndex, edgeIndexes) {
    return (
      edgeIndexes.length > 0 &&
      edgeIndexes.includes(iIndex) &&
      edgeIndexes.includes(jIndex)
    );
  }

  /**
   *
   * @param {*} vertex: Vector3
   */
  doesVertexCollideWithEdge(vertex, radius = Constants.RADIUS / 4) {
    /**
     * if collides with vertex return false
     * else compute distance from edge, if close enough return true else false
     */
    return this.graph
      .getVertex(vertex)
      .cata(
        () =>
          this.graph.getEdge(vertex).map(rEdge => {
            const edge = rEdge.edge.map(v => v.position).map(Vec3.ofBabylon);
            const e = edge[1].sub(edge[0]);
            const x = Vec3.ofBabylon(vertex).sub(edge[0]);
            const dot = e.dot(x) / e.dot(e);
            if (dot < 0 || dot > 1) return false;
            const dist = x.sub(e.scale(dot)).length();
            return dist <= radius;
          }),
        rVertex => Maybe.none()
      )
      .orSome(false);
  }

  /**
   * Deletes colliding edge and create 2 new edge with the split
   *
   * @param {*} vertex: Vector3
   */
  resolveVertexEdgeCollision(vertex) {
    this.graph.getEdge(vertex).forEach(rEdge => {
      const edgeVec3 = rEdge.edge
        .map(({ position }) => position)
        .map(Vec3.ofBabylon);
      const edgeBabylon = rEdge.edge.map(v => v.position);

      // compute intersection
      const e = edgeVec3[1].sub(edgeVec3[0]).normalize();
      const x = Vec3.ofBabylon(vertex).sub(edgeVec3[0]);
      const proj = e.scale(x.dot(e));
      const vertexInEdge = edgeVec3[0].add(proj).toBabylon();

      // split operation
      this.delEdge(edgeBabylon[0], edgeBabylon[1]);
      this.addEdge([edgeBabylon[0], vertexInEdge]);
      this.addEdge([vertexInEdge, edgeBabylon[1]]);
      //import features
      this.importFeatures2Edge(rEdge, edgeBabylon[0], vertexInEdge);
      this.importFeatures2Edge(rEdge, vertexInEdge, edgeBabylon[1]);

      this.graph.getEdge(edgeBabylon[0], vertexInEdge).forEach(leftEdge => {
        this.graph.getEdge(vertexInEdge, edgeBabylon[1]).forEach(rightEdge => {
          this.mainView
            .getUndoManager()
            .addIt(
              this.getUndoResolveVertexEdgeCollision(rEdge, leftEdge, rightEdge)
            );
        });
      });
    });
  }

  getUndoResolveVertexEdgeCollision(oldEdge, leftEdge, rightEdge) {
    const oldEdgePositions = oldEdge.edge.map(({ position }) => position);
    const oldEdgeIndex = oldEdge.edge.map(({ id }) => id);
    const leftEdgePositions = leftEdge.edge.map(({ position }) => position);
    const leftEdgeIndex = leftEdge.edge.map(({ id }) => id);
    const rightEdgePositions = rightEdge.edge.map(({ position }) => position);
    const rightEdgeIndex = rightEdge.edge.map(({ id }) => id);
    return UndoManager.actionBuilder()
      .doAction(() => {
        // split operation
        this.delEdge(...oldEdgePositions);
        this.addEdge(leftEdgePositions, leftEdgeIndex);
        this.addEdge(rightEdgePositions, rightEdgeIndex);

        //import features
        this.importFeatures2Edge(oldEdge, ...leftEdgePositions);
        this.importFeatures2Edge(oldEdge, ...rightEdgePositions);
      })
      .undoAction(() => {
        // split operation
        this.delEdge(...leftEdgePositions);
        this.delEdge(...rightEdgePositions);
        this.addEdge(oldEdgePositions, oldEdgeIndex);

        //import features
        this.importFeatures2Edge(oldEdge, ...oldEdgePositions);
      })
      .build();
  }

  /**
   * Copy feature data of rEdgeWithData to edge (i,j)
   * @param {*} rEdgeWithData
   * @param {*} i
   * @param {*} j
   */
  importFeatures2Edge(rEdgeWithData, i, j) {
    this.graph.getEdge(i, j).forEach(({ edge }) => {
      const [uId, vId] = edge.map(({ id }) => id);
      this.graph
        .getEdgeByIndex(uId, vId)
        .forEach(rEdgePlus => rEdgePlus.importFeatures(rEdgeWithData));
      this.graph
        .getEdgeByIndex(vId, uId)
        .forEach(rEdgeMinus => rEdgeMinus.importFeatures(rEdgeWithData));
    });
  }

  /**
   *
   * @param {*} i: Vector3
   * @param {*} j: Vector3
   */
  buildEdge(i, j) {
    const { graph } = this;
    graph.addEdge([i, j]);
    graph.getVertex(i).forEach(rVertexI =>
      graph.getVertex(j).forEach(rVertexJ => {
        const edgeMesh = GraphItem.getEdgeMesh(this.scene, [
          rVertexI.position,
          rVertexJ.position
        ]);
        edgeMesh.parent = this.mesh;
        const iIndex = rVertexI.id;
        const jIndex = rVertexJ.id;
        edgeMesh.edgeIndexes = [iIndex, jIndex];
        this.addObserver2EdgeMesh(edgeMesh);
        this.addOnClickEdge(edgeMesh);
        this.meshByEdgeId[Graph.edgeKey(iIndex, jIndex)] = edgeMesh;
        this.meshByEdgeId[Graph.edgeKey(jIndex, iIndex)] = edgeMesh;
      })
    );
  }

  addObserver2EdgeMesh(edgeMesh) {
    edgeMesh.observers = new Observable();
    edgeMesh.observers.add(this.getEdgeObs());
  }

  getEdgeObs = () => ({ updatedPointMesh, is2updateServer, displacement }) => {
    const { edgeIndexes } = updatedPointMesh;

    const edgePos = edgeIndexes
      .map(i => this.meshByVertexId[i].position)
      .map(Vec3.ofBabylon);

    const v = Vec3.ofBabylon(displacement);
    edgePos.forEach((vertexPos, i) =>
      this.updateVertexPosition(
        edgeIndexes[i],
        vertexPos.add(v).toBabylon(),
        is2updateServer,
        edgeIndexes
      )
    );
    this.updateCurvedNeighbors(edgeIndexes, is2updateServer);
    if (is2updateServer) {
      this.graphFormMapper = this.getToFormEdge(updatedPointMesh);
      this.mainView.setProperties(this.toForm());
    }
  };

  addOnClickEdge(edgeMesh) {
    edgeMesh.onClick = this.getOnClickEdge(edgeMesh);
  }

  getOnClickEdge = edgeMesh => () => {
    const actions = [];

    actions.push({
      icon: props => <i className="fas fa-trash" {...props}></i>,
      action: () => {
        this.mainView.getUndoManager().doIt(this.getUndoDeleteEdge(edgeMesh));
      },
      name: "Delete Edge [Del]"
    });
    this.mainView.setContextActions(actions);
  };

  getUndoDeleteEdge(edgeMesh) {
    const { edgeIndexes } = edgeMesh;
    const edgeVertex = edgeIndexes
      .map(i => this.graph.getVertexByIndex(i))
      .map(maybeV => maybeV.some());
    const edgeIsCurve = edgeVertex.some(v => v.isCurve);
    return edgeIsCurve
      ? this.getUndoDelCurveEdge(edgeVertex)
      : this.getUndoDelLineEdge(edgeVertex);
  }

  getUndoDelCurveEdge(edgeVertex) {
    // there should be at least one vertex is curve
    const curvedVertex = edgeVertex.filter(v => v.isCurve)[0].position;
    const curvePath = this.graph.getCurvedPathFromVertex(curvedVertex);
    return UndoManager.actionBuilder()
      .doAction(() => {
        for (let i = 0; i < curvePath.length - 1; i++) {
          this.delEdge(curvePath[i].position, curvePath[i + 1].position);
        }
        this.mainView.closeContextDial();
        this.mainView.updateNodeInServer(this.name);
      })
      .undoAction(() => {
        for (let i = 0; i < curvePath.length - 1; i++) {
          const edge = [curvePath[i], curvePath[i + 1]];
          const edgeIndexes = edge.map(({ id }) => id);
          const edgePos = edge.map(({ position }) => position);
          const edgeIsCurve = edge.map(({ isCurve }) => isCurve);
          this.addEdge(edgePos, edgeIndexes, edgeIsCurve);
        }
        this.mainView.updateNodeInServer(this.name);
      })
      .build();
  }

  getUndoDelLineEdge(edgeVertex) {
    const edgeIndexes = edgeVertex.map(({ id }) => id);
    const edgePos = edgeVertex.map(({ position }) => position);
    const edgeIsCurve = edgeVertex.map(({ isCurve }) => isCurve);
    return UndoManager.actionBuilder()
      .doAction(() => {
        this.delEdge(...edgePos);
        this.mainView.closeContextDial();
        this.mainView.updateNodeInServer(this.name);
      })
      .undoAction(() => {
        this.addEdge(edgePos, edgeIndexes, edgeIsCurve);
        this.mainView.updateNodeInServer(this.name);
      })
      .build();
  }

  //========================================================================================
  /*                                                                                      *
   *                             Static Methods and Variables                             *
   *                                                                                      */
  //========================================================================================

  static TYPE = "GraphItem";

  static NAME = "Roads";

  static ofDict(scene, dict = null, mainView = null) {
    const graphItem = new GraphItem(
      scene,
      mainView,
      dict.name,
      dict.keyValueMap
    );
    const { adjMap, edges } = dict;
    // create mesh of graph using addEdge
    Object.keys(adjMap).forEach(i => {
      Object.keys(adjMap[i]).forEach(j => {
        if (i < j) {
          const edge = edges[Graph.edgeKey(i, j)];
          const posIJ = edge.positions.map(Vec3.of).map(p => p.toBabylon());
          graphItem.addEdge(posIJ, [i, j], edge.isCurve);
        }
      });
    });
    //import dict data to graph Embedding structure
    graphItem.graph.importData(dict);
    return graphItem;
  }

  /**
   *
   * @param {*} scene: Babylon js scene
   * @param {*} edgePositions: Array<Vector3>
   * @param {*} color: Color3
   */
  static getEdgeWithVertexMeshes(
    scene,
    edgePositions,
    color = Color3.Gray(),
    radius = Constants.RADIUS
  ) {
    const ans = edgePositions.map(p =>
      GraphItem.getVertexMesh(scene, p, color, radius)
    );
    ans.push(GraphItem.getEdgeMesh(scene, edgePositions, color, radius));
    return ans;
  }

  static getCurveEdgeWithVertexMeshes(
    scene,
    edgePositions,
    color = Color3.Gray(),
    radius = Constants.RADIUS
  ) {
    const ans = [];
    const i = edgePositions[0];
    const j = edgePositions[2];
    ans.push(GraphItem.getVertexMesh(scene, i, color, radius));
    ans.push(GraphItem.getVertexMesh(scene, j, color, radius));
    ans.push(GraphItem.getCurveEdgeMesh(scene, edgePositions, color, radius));
    return ans;
  }

  static getVertexMesh(
    scene,
    vertexPosition,
    color = Color3.Gray(),
    radius = Constants.RADIUS
  ) {
    const sphere = Util3d.createSphere(scene, color, radius);
    sphere.position = vertexPosition;
    return sphere;
  }

  static getEdgeMesh(
    scene,
    edge,
    color = Color3.Gray(),
    radius = Constants.RADIUS
  ) {
    return Util3d.createTubeFromPoints(scene, edge, color, radius / 4);
  }

  static getCurveEdgeMesh(
    scene,
    edge,
    color = Color3.Gray(),
    radius = Constants.RADIUS,
    error = 0.25
  ) {
    return Util3d.createTubeFromPoints(
      scene,
      GraphItem.getCurveEdgePoints(edge, error),
      color,
      radius / 4
    );
  }

  static getCurveEdgePoints(edge, error = 0.25) {
    const [i, k, j] = edge;
    const halfD2x = i.subtract(k.scale(2)).add(j);
    const halfD2xNorm = halfD2x.length();
    let numberOfPoints =
      halfD2xNorm < 1e-3 ? 2 : halfD2xNorm / Math.max(1e-6, error);
    numberOfPoints = Math.floor(numberOfPoints);
    // console.log("NUMBER OF POINTS", numberOfPoints, halfD2x.length());
    return Curve3.CreateQuadraticBezier(i, k, j, numberOfPoints).getPoints();
  }
}

const graphItemInstances = {};

const getGraphPlaceHolder = (scene, name) => {
  const graphPlaceHolder = Util3d.createSphere(
    scene,
    Color3.Gray(),
    Number.MIN_VALUE,
    name,
    false
  );
  graphPlaceHolder.position = Vector3.Zero();
  graphPlaceHolder.scaling = Vector3.One();
  graphPlaceHolder.rotationQuaternion = Quaternion.Identity();
  graphPlaceHolder.visibility = 0.0;
  return graphPlaceHolder;
};
export default GraphItem;
