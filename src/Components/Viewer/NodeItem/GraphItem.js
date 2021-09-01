import NodeItem from "./NodeItem";
import Util3d from "../Util3d/Util3d";
import { Color3, Vector3, Observable } from "@babylonjs/core";
import Constants from "../Utils/Constants";
import { Quaternion } from "@babylonjs/core/Maths/math";
import Graph from "../Graph/Graph";
import Vec3 from "../Math/Vec3";
import { Maybe } from "monet";
import React from "react";
import lodashGet from "lodash/get";
import { UndoManager } from "@mov-ai/mov-fe-lib-core";
import Path from "./Path";
import KeyPoint from "./KeyPoint";

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
    this.graph = new Graph();
    this.scene = scene;
    this.mainView = mainView;
    this.meshByEdgeId = {};
    this.graphFormMapper = this.getDefaultFormMapper();
    this.vertexGenerator = 0;
  }

  getType = () => GraphItem.TYPE;

  toDict() {
    const dict = super.toDict();
    const { graph } = this;
    const vertices = { ...graph.getVertices() };
    const edges = { ...graph.getEdges() };
    Object.keys(vertices).forEach(k => {
      graph.getVertex(k).forEach(({ data: vertexData }) => {
        vertices[k] = {
          position: Vec3.ofBabylon(vertexData.position).toArray(),
          id: String(k)
        };
      });
    });
    // export directed graph
    Object.keys(edges).forEach(k => {
      const ids = Graph.key2Edge(k);
      graph.getEdge(...ids).forEach(({ data: edgeData }) => {
        const [i, j] = ids.map(x => Number(x));
        const edgeMesh = edgeData.edge.map(({ mesh }) => mesh);
        const [belongsSrcMesh, belongsTrgMesh] = edgeMesh;
        edges[k] = {
          ids: ids,
          keyValueMap: edgeData.keyValueMap,
          weight: edgeData.weight,
          belongsSrc:
            i < j
              ? this.exportBelongToData(belongsSrcMesh)
              : this.exportBelongToData(belongsTrgMesh),
          belongsTrg:
            i < j
              ? this.exportBelongToData(belongsTrgMesh)
              : this.exportBelongToData(belongsSrcMesh)
        };
        if (this.doMeshesBelong2SamePath(...edgeMesh)) {
          if (i > j) {
            // remove edge if belongs to same path and i > j
            delete edges[k];
          }
        } else {
          if (this.checkInvalidEdges(...edgeMesh, edges[k])) {
            // remove edge if is invalid edge
            delete edges[k];
          }
        }
      });
    });
    dict["vertices"] = vertices;
    dict["edges"] = edges;
    return dict;
  }

  toForm() {
    const form = super.toForm();
    delete form.jsonSchema.properties.position;
    delete form.jsonSchema.properties.rotation;
    delete form.jsonSchema.properties.color;
    delete form.uiSchema.position;
    delete form.uiSchema.rotation;
    delete form.uiSchema.color;
    delete form.data.position;
    delete form.data.rotation;
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

  getToFormEdge(edgeMesh) {
    const { graph } = this;
    return {
      toForm: form => {
        return graph
          .getEdge(...edgeMesh.edgeIndexes)
          .map(({ data: edgeData }) => {
            form.jsonSchema.properties["weight"] = {
              type: "number",
              title: "Weight"
            };
            form.data["weight"] = edgeData.weight;
            NodeItem.setAnnotations2Form(form, edgeData.keyValueMap);
            form.jsonSchema.properties[
              "annotations"
            ].title = `Annotations Edge ${edgeMesh.edgeIndexes}`;
            return form;
          })
          .orSome(form);
      },
      ofForm: form => {
        const { edgeIndexes } = edgeMesh;
        graph.getEdge(...edgeIndexes).forEach(({ data: edgeData }) => {
          edgeData.keyValueMap = { ...lodashGet(form, "annotations", {}) };
          edgeData.weight = Number.parseFloat(form.weight);
        });
      }
    };
  }

  /**
   * @override nodeItem delVertex()
   * Delete all vertex from tree nodes
   */
  delVertex() {
    // Iterate though all nodes under the root node and delete its vertexes
    const root = this.mainView.getRootNode();
    this.delVertexRecursively(root?.children);
  }

  //========================================================================================
  /*                                                                                      *
   *                                   Graph Operations                                   *
   *                                                                                      */
  //========================================================================================

  /**
   *
   * @param {*} iMesh: Mesh vertex
   * @param {*} jMesh: Mesh vertex
   * @param {*} edgeIndexes: Array<Integer>
   */
  addEdge(iMesh, jMesh, edgeIndexes = []) {
    const [iIndex, jIndex] = edgeIndexes;
    if (this.hasEdge(iMesh, jMesh)) return;
    this.buildVertex(iMesh, iIndex);
    this.buildVertex(jMesh, jIndex);
    this.buildEdge(iMesh, jMesh);
    return this;
  }

  getEdge(iMesh, jMesh) {
    const { graph } = this;
    const [i, j] = [iMesh, jMesh].map(this.getVertexIdFromMesh);
    // if it has an edge
    return graph.getEdge(i, j).map(({ data }) => data);
  }

  delEdge(iMesh, jMesh) {
    const { graph } = this;
    const [i, j] = [iMesh, jMesh].map(this.getVertexIdFromMesh);
    // if it has an edge
    graph.getEdge(i, j).forEach(({ data: edgeData }) => {
      const ijKey = Graph.edgeKey(i, j);
      const jiKey = Graph.edgeKey(j, i);
      Maybe.fromNull(this.meshByEdgeId[ijKey]).forEach(mesh => {
        mesh.dispose();
        delete this.meshByEdgeId[ijKey];
        delete this.meshByEdgeId[jiKey];
      });
      graph.delEdge(i, j);
    });
    // Reset right menu to display scene details
    this.mainView.setProperties();
  }

  /**
   *
   * @param {*} iMesh: Mesh
   * @param {*} jMesh: Mesh
   */
  hasEdge(iMesh, jMesh) {
    const [i, j] = [iMesh, jMesh].map(this.getVertexIdFromMesh);
    return this.graph.hasEdge(i, j);
  }

  delVertexFromMesh(iMesh, is2updateServer = true) {
    const { graph } = this;
    const i = this.getVertexIdFromMesh(iMesh);
    graph.getVertex(i).forEach(_ => {
      // if vertex found delete neighbors
      const neighbors = graph.getNeighbors(i);
      neighbors
        .map(j => graph.getVertex(j))
        .forEach(maybeV =>
          maybeV.forEach(({ data: vertexData }) => {
            const { mesh: jMesh } = vertexData;
            this.delEdge(iMesh, jMesh);
          })
        );
      // delete itself
      graph.delVertex(i);
      iMesh.graphVertex = undefined;
      if (is2updateServer) this.mainView.updateNodeInServer(this.name);
    });
  }
  /**
   *
   * @param {*} iMesh
   * @returns {*} Maybe<Vertex>
   */
  getVertex(iMesh) {
    const { graph } = this;
    const i = this.getVertexIdFromMesh(iMesh);
    return graph.getVertex(i).map(({ data }) => data);
  }

  /**
   *
   * @param {*} iMesh
   * @returns {*} Array<Vertex>
   */
  getNeighbors(iMesh) {
    const { graph } = this;
    const i = this.getVertexIdFromMesh(iMesh);
    return graph
      .getNeighbors(i)
      .map(id => graph.getVertex(id).orNull())
      .map(({ data }) => data)
      .filter(x => !!x);
  }

  doMeshesBelong2SamePath(iMesh, jMesh) {
    const iParentNodeItem = iMesh?.parent?.nodeItem;
    const jParentNodeItem = jMesh?.parent?.nodeItem;
    return (
      !!iParentNodeItem &&
      !!jParentNodeItem &&
      iParentNodeItem.name === jParentNodeItem.name &&
      iParentNodeItem.getType() === Path.TYPE &&
      jParentNodeItem.getType() === Path.TYPE
    );
  }

  //========================================================================================
  /*                                                                                      *
   *                                    Private Methods                                   *
   *                                                                                      */
  //========================================================================================
  /**
   *
   * @param {*} id: vertex to be updated id
   * @param {*} newPosition: Vector3, new vertex position
   * @param {*} is2updateServer: is to update in server boolean var
   * @param {*} protectEdge: Pair<Int> with vertex indices
   */
  updateVertexPosition(id, newPosition, is2updateServer = true) {
    const { graph } = this;
    graph.getVertex(id).forEach(({ data: vertexData }) => {
      vertexData.position = newPosition;
    });
    graph.getNeighbors(id).forEach(j => {
      const i = id;
      const edgeKey = Graph.edgeKey(i, j);
      this.meshByEdgeId[edgeKey] && this.meshByEdgeId[edgeKey].dispose();
      graph.getEdge(i, j).forEach(({ data: edgeData }) => {
        const [iData, jData] = edgeData.edge;
        this.buildEdge(iData.mesh, jData.mesh);
      });
      if (is2updateServer) this.mainView.updateNodeInServer(this.name);
    });
  }

  /**
   * Get edge directions from meshes
   * @param {Array} ids : Array with vertexes ids
   * @returns {Integer} should return always one of the following
   *  +1  -> if target id is greater than source
   *  0   -> if ids is not provided
   *  -1  -> if source id is greater than target
   */
  getDirectionFromMeshes(iMesh, jMesh) {
    if (GraphItem.isInvalidEdge(iMesh, jMesh, true)) return 0;
    const vertexI = this.getVertexIdFromMesh(iMesh);
    const vertexJ = this.getVertexIdFromMesh(jMesh);
    const [i, j] = [vertexI, vertexJ].map(x => Number(x));
    return (j - i) / Math.abs(j - i);
  }

  //========================================================================================
  /*                                                                                      *
   *                                    Private Methods                                   *
   *                                                                                      */
  //========================================================================================

  /**
   * Delete vertex from nodeTree children
   * @param {*} nodeTree: List of nodes (initially root.children)
   */
  delVertexRecursively(nodeTree = []) {
    nodeTree.forEach(node => {
      if (node.item.getType() !== GraphItem.TYPE) {
        node.item.delVertex();
        this.delVertexRecursively(node.children);
      }
    });
  }

  /**
   *
   * @param {*} mesh: Mesh
   * @returns Integer| Undefined
   */
  getVertexIdFromMesh(mesh) {
    return mesh?.graphVertex?.vertex?.id;
  }

  /**
   *
   * @param {*} vertexMesh: Mesh
   * @param {*} vertexIndex: integer representing index of vertex (can be undefined)
   *
   */
  buildVertex(vertexMesh, vertexIndex) {
    // test if vertexMesh already exists in the graph
    const vId = this.getVertexIdFromMesh(vertexMesh);
    const maybeVertex = this.graph.getVertex(vId);
    maybeVertex.orElseRun(() => {
      // if vertex doesn't exist
      const id = vertexIndex ? vertexIndex : this.vertexGenerator++;
      this.graph.addVertex(id);
      this.graph.getVertex(id).forEach(vertex => {
        vertex.data = VertexData.builder()(id, vertexMesh);
        this.addObs2VertexMesh(vertex.data);
      });
    });
  }

  /**
   *
   * @param {*} vData: VertexData
   */
  addObs2VertexMesh(vData) {
    const { mesh } = vData;
    if (mesh !== undefined) {
      mesh.graphVertex = {
        vertex: vData,
        delVertex: () => this.delVertexFromMesh(mesh),
        vertexObs: this.getVertexMeshObs(vData)
      };
    }
  }

  /**
   *
   * @param {*} vertexData: VertexData
   */
  getVertexMeshObs(vertexData) {
    return ({ updatedPointMesh, is2updateServer, _ }) => {
      if (updatedPointMesh.isDisposed()) return;
      const newPos = Util3d.getGlobalCoordinates(
        updatedPointMesh,
        updatedPointMesh.position
      ).toBabylon();
      this.updateVertexPosition(vertexData.id, newPos, is2updateServer);
    };
  }

  /**
   *
   * @param {*} iMesh: Mesh
   * @param {*} jMesh: Mesh
   * @param {*} edgeMeshes: Array<Mesh>
   */
  buildEdge(iMesh, jMesh) {
    const { graph } = this;
    // need to sort edge numbers because is undirected graph
    const [i, j] = [iMesh, jMesh]
      .map(this.getVertexIdFromMesh)
      .sort((a, b) => a - b); // reason here: https://stackoverflow.com/questions/15084070/is-this-a-bug-in-array-sort
    graph.addEdge(i, j);
    graph.getVertex(i).forEach(({ data: iVertexD }) =>
      graph.getVertex(j).forEach(({ data: jVertexD }) => {
        graph.getEdge(i, j).forEach(edge => {
          if (!edge.data) {
            edge.data = new EdgeData(iVertexD, jVertexD);
          } else {
            edge.data.edge = [iVertexD, jVertexD];
          }
        });
        // if vertices belong to same path don't build mesh
        if (!this.doMeshesBelong2SamePath(iMesh, jMesh)) {
          // Get edge forward/backward directions
          const forwardDirection = this.getDirectionFromMeshes(iMesh, jMesh);
          const backwardDirection = this.getDirectionFromMeshes(jMesh, iMesh);
          const direction = forwardDirection + backwardDirection;
          const edgeMesh = this.getEdgeMesh(iVertexD, jVertexD, direction);
          this.meshByEdgeId[Graph.edgeKey(i, j)] = edgeMesh;
          this.meshByEdgeId[Graph.edgeKey(j, i)] = edgeMesh;
        }
      })
    );
  }

  getEdgeMesh(iVertexD, jVertexD, direction = 0) {
    const edgeInGlobal = [iVertexD, jVertexD].map(({ mesh }) =>
      Util3d.getGlobalCoord(mesh, mesh.position)
    );
    const edgeMesh = GraphItem.getEdgeMesh(
      this.scene,
      edgeInGlobal,
      `edgeMesh${iVertexD.id}_${jVertexD.id}`,
      Color3.Yellow()
    );
    edgeMesh.visibility = 0.99;
    edgeMesh.material = GraphItem.getEdgeMaterial(this.scene, {
      speed: 8 * direction
    });
    edgeMesh.parent = this.mesh;
    edgeMesh.edgeIndexes = [iVertexD, jVertexD].map(({ id }) => id);
    edgeMesh.getMouseContextActions = this.getEdgeMouseCtxActions(edgeMesh);
    edgeMesh.onDel = this.onDeleteEdgeLine(edgeMesh);
    this.addObserver2EdgeMesh(edgeMesh);
    this.addOnClickEdge(edgeMesh);
    return edgeMesh;
  }

  /**
   *
   * @param {*} edgeMesh: Mesh
   * @returns: () => Array<{title: String, onClick: () => {}}>
   */
  getEdgeMouseCtxActions = edgeMesh => () => {
    return [
      {
        title: "Delete",
        onClick: this.getUndoDeleteEdgeLineAction(edgeMesh)
      }
    ];
  };

  /**
   * Prompt confirmation to delete edge line
   * @param {Mesh} edgeMesh : Edge line mesh to delete
   * @returns Function to prompt confirmation to delete edge line
   */
  onDeleteEdgeLine = edgeMesh => () => {
    this.mainView.confirmationAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this edge?",
      onConfirm: this.getUndoDeleteEdgeLineAction(edgeMesh)
    });
  };

  /**
   * Use undoManager to delete edge line
   * @param {Mesh} edgeMesh : Edge line mesh to delete
   * @returns Function to delete edge line using undoManager
   */
  getUndoDeleteEdgeLineAction = edgeMesh => () =>
    this.mainView.getUndoManager().doIt(this.getUndoDeleteEdge(edgeMesh));

  /**
   *
   * @param {*} edgeMesh: Mesh
   */
  addObserver2EdgeMesh(edgeMesh) {
    edgeMesh.observers = new Observable();
    edgeMesh.observers.add(this.getEdgeObs());
  }

  /**
   * @returns ({updatedPointMesh: Mesh, is2updateServer: Boolean, displacement: Vector3}) => {}
   */
  getEdgeObs =
    () =>
    ({ updatedPointMesh, is2updateServer, displacement }) => {
      const v = Vec3.ofBabylon(displacement);
      const vLocal = Util3d.getLocalCoordFromWorld(this.mesh, v, false);
      updatedPointMesh.position = updatedPointMesh.position.add(
        vLocal.scale(-1).toBabylon()
      );
      if (is2updateServer) {
        this.graphFormMapper = this.getToFormEdge(updatedPointMesh);
        this.mainView.setProperties(this.toForm());
      }
    };

  /**
   *
   * @param {*} edgeMesh: Mesh
   */
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
    const { graph } = this;
    const { edgeIndexes } = edgeMesh;
    const [iVertexD, jVertexD] = edgeIndexes
      .map(i => graph.getVertex(i))
      .map(maybeV => maybeV.some())
      .map(({ data }) => data);
    return this.getUndoDelLineEdge(iVertexD, jVertexD);
  }

  getUndoDelLineEdge(iVertexD, jVertexD) {
    const { graph } = this;
    const edgeVertexD = [iVertexD, jVertexD];
    const [i, j] = edgeVertexD.map(({ id }) => id);
    const edgeMeshes = edgeVertexD.map(({ mesh }) => mesh);
    let edgeProps = { keyValueMap: {}, weight: 1, edge: {} };
    graph.getEdge(i, j).forEach(({ data: edgeData }) => {
      edgeProps.keyValueMap = edgeData.keyValueMap;
      edgeProps.weight = edgeData.weight;
      edgeProps.edge = edgeData.edge;
    });
    return UndoManager.actionBuilder()
      .doAction(() => {
        this.delEdge(...edgeMeshes);
        this.mainView.closeContextDial();
        this.mainView.updateNodeInServer(this.name);
      })
      .undoAction(({ is2UpdateInServer = true }) => {
        this.addEdge(...edgeMeshes, [i, j]);
        graph.getEdge(i, j).forEach(({ data: edgeData }) => {
          edgeData.keyValueMap = edgeProps.keyValueMap;
          edgeData.weight = edgeProps.weight;
          edgeData.edge = edgeProps.edge;
        });
        if (is2UpdateInServer) this.mainView.updateNodeInServer(this.name);
      })
      .build();
  }

  isMeshBelong2Path = ({ parent }) => {
    return this.mainView
      .getNodeFromTree(parent?.name)
      .filter(({ item }) => item.getType() === Path.TYPE)
      .orSome(false);
  };

  /**
   * Get item name from mesh
   * @param {Mesh} mesh : Mesh to retrieve name
   * @returns {String}
   *  If mesh is a key point belonging to a path, returns parent name
   *  and returns the mesh name otherwise
   */
  getMeshName = mesh => {
    return this.isMeshBelong2Path(mesh) ? mesh.parent.name : mesh.name;
  };

  /**
   * Check if edgeData linking Mesh1 and Mesh2 is valid
   * @param {Mesh} iMesh : Mesh 1
   * @param {Mesh} jMesh : Mesh 2
   * @param {*} edgeData : Edge to be evaluated
   * @returns {Boolean} True if is invalid and False otherwise
   */
  checkInvalidEdges(iMesh, jMesh, edgeData) {
    // Check if at least one of the meshes is Path
    //  returns false if any of the meshes is Path
    const edgeMeshesContainsPath = [iMesh, jMesh]
      .map(this.isMeshBelong2Path)
      .some(x => x);
    if (!edgeMeshesContainsPath) return false;
    // Identify source and target meshes
    const srcMesh = [iMesh, jMesh].filter(
      mesh => this.getMeshName(mesh) === edgeData.belongsSrc.name
    )[0];
    const trgMesh = [iMesh, jMesh].filter(
      mesh => this.getMeshName(mesh) === edgeData.belongsTrg.name
    )[0];
    // Call GraphItem.isInvalidEdge function to validate
    return srcMesh && trgMesh
      ? GraphItem.isInvalidEdge(srcMesh, trgMesh, true)
      : false;
  }

  exportBelongToData = mesh => {
    const { index, name } = mesh;
    if (index === null || index === undefined) {
      return { name };
    }
    // if mesh has index, then it must be a path or polygon
    return this.mainView
      .getNodeFromTree(mesh?.parent?.name)
      .map(({ item }) => ({
        name: item.name,
        index: index > 0 ? -1 : index
      }))
      .orUndefined();
  };
  //========================================================================================
  /*                                                                                      *
   *                             Static Methods and Variables                             *
   *                                                                                      */
  //========================================================================================

  static TYPE = "GraphItem";

  static NAME = "LogicGraph";

  static ofDict(scene, dict = null, mainView = null) {
    if (!dict || !mainView)
      throw new Error("null dictionary describing graphItem or null mainView");
    const graphItem = new GraphItem(
      scene,
      mainView,
      dict.name,
      dict.keyValueMap
    );
    const { edges } = dict;
    let vertexCounter = Number.MIN_VALUE;
    // create mesh of graph using addEdge
    // map directed graph -> undirected graph
    Object.values(edges).forEach(({ ids, belongsSrc, belongsTrg }) => {
      const [i, j] = ids.map(x => Number(x));
      // update vertex counter
      vertexCounter = Math.max(vertexCounter, Math.max(i, j));
      const edgeMeshes = getMeshesFromEdgeData(mainView, {
        belongsSrc,
        belongsTrg
      });
      const foundMeshes = edgeMeshes.reduce(
        (e, x) => e && x !== null && x !== undefined,
        true
      );
      if (foundMeshes) {
        graphItem.addEdge(...edgeMeshes, [i, j]);
        // add additional data
        graphItem.graph.getEdge(i, j).forEach(({ data: edgeData }) => {
          const dataEdge = edges[Graph.edgeKey(i, j)];
          edgeData.importFeatures(dataEdge);
        });
      }
    });
    graphItem.vertexGenerator = vertexCounter + 1;
    return graphItem;
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

  /**
   *
   * @param {*} scene: Scene
   * @param {*} edge: Array<Vector3>
   * @param {*} color: Color3
   * @param {*} radius: Number
   */
  static getEdgeMesh(
    scene,
    edge,
    name,
    color = Color3.Gray(),
    radius = Constants.RADIUS / 4
  ) {
    return Util3d.createTubeFromPoints(scene, edge, color, radius, name);
  }

  static getEdgeMaterial(
    scene,
    { color = Color3.Yellow(), frequency = 8, speed = 0 }
  ) {
    return Util3d.getShaderMaterial({
      vertex: VERTEX,
      frag: FRAG(frequency, speed, [color.r, color.g, color.b])
    })(scene);
  }

  static createGraphItemIfNone = (scene, parentView) =>
    parentView.getGraph().orElseRun(() => {
      const graphItem = new GraphItem(scene, parentView);
      graphItem.mesh.parent = parentView.getRootNode().item.mesh;
      parentView.addNodeItem2Tree(graphItem);
    });

  /**
   * Check if edge being draw is invalid
   *    Invalid Edge 1   : validate direction
   *    Invalid Edge 1.1 : not possible link from start to end, only end to start
   *    Invalid Edge 1.2 : not possible link from start of a path to a keyPoint, only keyPoint to start of path
   *    Invalid Edge 1.3 : not possible link from keyPoint to end of a path, only end of path to keyPoint
   *    Invalid Edge 2   : from the end of a path to the end of another path
   *    Invalid Edge 3   : from the start of a path to the start of another path
   *    Invalid Edge 4   : firstMesh and secondMesh has same name (impossible to link mesh to itself)
   *
   * @param {Mesh} firstMesh: origin/source edge mesh
   * @param {Mesh} secondMesh: destination/target edge mesh
   * @param {Boolean} validateDirection : Flag to inform if function should validate direction (false by default)
   * @returns {Boolean} True if has any validation error and False otherwise
   */
  static isInvalidEdge = (firstMesh, secondMesh, validateDirection = false) => {
    const firstMeshParent = firstMesh.parent?.nodeItem;
    const secondMeshParent = secondMesh.parent?.nodeItem;
    const validationError = [];
    // Validate invalid edges between paths
    if (
      Util3d.getNodeItemTypeFromMesh(firstMesh) === Path.TYPE &&
      Util3d.getNodeItemTypeFromMesh(secondMesh) === Path.TYPE
    ) {
      const origin = firstMesh.index / (firstMeshParent.keyPoints.length - 1);
      const target = secondMesh.index / (secondMeshParent.keyPoints.length - 1);
      // Validate direction
      if (validateDirection) {
        // Invalid Edge 1.1 validation
        if (origin === 0 && target === 1) validationError.push(1.1);
      }
      // Invalid Edge 2 validation
      if (origin === 1 && target === 1) validationError.push(2);
      // Invalid Edge 3 validation
      if (origin === 0 && target === 0) validationError.push(3);
    }
    // Validate direction
    if (validateDirection) {
      // Invalid Edge 1.2 validation
      if (
        Util3d.getNodeItemTypeFromMesh(firstMesh) === Path.TYPE &&
        Util3d.getNodeItemTypeFromMesh(secondMesh) === KeyPoint.TYPE
      ) {
        if (firstMesh.index / (firstMeshParent.keyPoints.length - 1) === 0)
          validationError.push(1.2);
      }
      // Invalid Edge 1.3 validation
      if (
        Util3d.getNodeItemTypeFromMesh(firstMesh) === KeyPoint.TYPE &&
        Util3d.getNodeItemTypeFromMesh(secondMesh) === Path.TYPE
      ) {
        if (secondMesh.index / (secondMeshParent.keyPoints.length - 1) === 1)
          validationError.push(1.3);
      }
    }
    // Invalid Edge 4 validation
    if (firstMesh.name === secondMesh.name) validationError.push(4);
    // Return if there's any validation error
    return validationError.length > 0;
  };
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

const getMeshesFromEdgeData = (mainView, edgeProps) => {
  const { belongsSrc, belongsTrg } = edgeProps;
  const edgeMesh = [belongsSrc, belongsTrg].map(({ name, index }) => {
    return mainView
      .getNodeFromTree(name)
      .map(({ item }) => {
        if (index === null || index === undefined) return item.mesh;
        // if has index, then it must be a path or polygon
        const ind = index < 0 ? item.keyPoints.length - 1 : index;
        return item.keyPoints[ind];
      })
      .orUndefined();
  });
  return edgeMesh;
};

class VertexData {
  /**
   *
   * @param {*} id: Integer
   * @param {*} mesh: Mesh
   * @param {*} position:
   */
  constructor(id, mesh, position) {
    this.id = id;
    this.mesh = mesh;
    this.position = position;
  }

  static builder() {
    return (id, mesh) => {
      const globalPos = Util3d.getGlobalCoordinates(
        mesh,
        mesh.position
      ).toBabylon();
      return new VertexData(id, mesh, globalPos);
    };
  }
}

class EdgeData {
  constructor(vertexDataI, vertexDataJ, keyValueMap = {}) {
    this.edge = [vertexDataI, vertexDataJ];
    this.keyValueMap = keyValueMap;
    this.weight = 1.0;
  }

  importFeatures({ keyValueMap, weight }) {
    this.keyValueMap = keyValueMap;
    this.weight = weight;
  }
}

const VERTEX = `
precision highp float;
// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;

// Varying
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;

void main(void) {
    vec4 outPosition = worldViewProjection * vec4(position, 1.0);
    gl_Position = outPosition;

    vUV = uv;
    vPosition = position;
    vNormal = normal;
}`;

const FRAG = (freq = 8, speed = 2, color) => `
#define PI 3.1415926538
precision highp float;

// Varying
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;

// Refs
uniform float time;

void main(void) {
    vec3 color = vec3(${color[0]}, ${color[1]}, ${color[2]});
    float frequency = ${Number(freq).toFixed(1)};
    float speed = ${Number(speed).toFixed(1)};
    gl_FragColor = vec4(color, max(0.,sin(2. * PI * vUV.y * frequency - speed * time)));
}`;

export default GraphItem;
