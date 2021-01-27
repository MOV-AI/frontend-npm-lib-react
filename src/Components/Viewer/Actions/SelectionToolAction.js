import MouseKeysAction from "./MouseKeysAction";
import React from "react";
import Util3d from "../Util3d/Util3d";
import Vec2 from "../Math/Vec2";
import ReactDOM from "react-dom";
import TreeObject from "../TreeObject/TreeObject";
import GlobalRef from "../NodeItem/GlobalRef";
import Map from "../NodeItem/Map";
import GraphItem from "../NodeItem/GraphItem";
import { Maybe } from "monet";
import Graph from "../Graph/Graph";
import SelectionPlaceHolder from "../Util3d/SelectionPlaceHolder";

//========================================================================================
/*                                                                                      *
 *                                      DEPRECATED                                      *
 *                                                                                      */
//========================================================================================

class SelectionToolAction extends MouseKeysAction {
  constructor() {
    super();
    this.key = "selectionTool";
    this.name = "Select tool [2]";
    this.icon = props => <i className="fas fa-mouse-pointer" {...props}></i>;
    this.startDivPos = Vec2.ZERO;
    this.corners = [];
  }

  action = parentView => {
    super.action(parentView);
    parentView.setSelectedAction(this);
  };

  onPointerDown = (evt, parentView) => {
    if (!(evt.buttons === 1)) return;
    parentView.getSceneMemory().forEach(({ camera, canvas, scene, ground }) => {
      camera.detachControl(canvas);
      this.createSelectionDiv(evt);
      this.corners.push(Vec2.of(scene.pointerX, scene.pointerY));
    });
  };

  onPointerMove = (evt, parentView) => {
    if (!(evt.buttons === 1)) return;
    this.updateSelectionDiv(evt);
  };

  onPointerUp = (evt, parentView) => {
    parentView.getSceneMemory().forEach(({ camera, canvas, scene }) => {
      camera.attachControl(canvas, true);
      this.selectObjectsInside(scene, parentView);
      this.destroySelectionDiv();
      this.corners = [];
    });
  };

  onKeyUp = (evt, parentView) => {
    const defaultAction = () => super.onKeyUp(evt, parentView);
    const predicateActionList = [
      { predicate: e => true, action: defaultAction },
      { predicate: e => e.keyValue === "Delete" }
    ];
    for (let i = 0; i < predicateActionList.length; i++) {
      const predicateAction = predicateActionList[i];
      if (predicateAction.predicate(evt)) {
        predicateAction.action();
        break;
      }
    }
  };

  selectObjectsInside(scene, parentView) {
    if (this.corners.length === 0) return;
    this.corners.push(Vec2.of(scene.pointerX, scene.pointerY));
    const [oldMouse, newMouse] = this.corners;
    const min = newMouse.op(oldMouse, Math.min);
    const max = newMouse.op(oldMouse, Math.max);
    const cornersDiv = [min, Vec2.of(max.x, min.y), max, Vec2.of(min.x, max.y)];
    const rayCastCorners = cornersDiv.map(p => this.pickPoints(p, parentView));
    if (rayCastCorners.some(x => x === null || x === undefined)) return;
    const treeObj = new TreeObject(parentView.getObjectTree());
    const insideBox = treeObj.flatten(
      this.isItemInsideBox(rayCastCorners, parentView)
    );
    let insideBoxDragAbleMeshes = insideBox.map(({ item }) => item.mesh);
    // edges are special meshes as they don't have position
    let insideBoxMeshes = [...insideBoxDragAbleMeshes];
    // add graph meshes
    parentView.getGraph().forEach(({ item: graph }) => {
      // add vertex mesh
      insideBoxDragAbleMeshes = insideBoxDragAbleMeshes.concat(
        Object.values(graph.meshByVertexId).filter(
          this.isMeshInsideBox(rayCastCorners, parentView)
        )
      );
      // add edge mesh
      insideBoxMeshes = [...insideBoxDragAbleMeshes].concat(
        Object.keys(graph.meshByEdgeId)
          .map(Graph.key2Edge)
          .map(([i, j]) => {
            const vertexI = graph.meshByVertexId[i];
            const vertexJ = graph.meshByVertexId[j];
            return {
              mesh: graph.meshByEdgeId[Graph.edgeKey(i, j)],
              absolutePosition: vertexI.absolutePosition
                .add(vertexJ.absolutePosition)
                .scale(1 / 2)
            };
          })
          .filter(this.isMeshInsideBox(rayCastCorners, parentView))
          .map(({ mesh }) => mesh)
      );
    });
    parentView.highlightMeshesInScene(insideBoxMeshes);
    if (insideBoxDragAbleMeshes.length !== 0) {
      this.buildPlaceholder(insideBoxDragAbleMeshes, parentView);
    } else {
      this.clearPlaceholder(parentView);
    }
  }

  /**
   *
   * @param {*} p: Vec2 point in canvas
   * @param {*} parentView: MainView
   */
  pickPoints(p, parentView) {
    return parentView
      .getSceneMemory()
      .flatMap(memory => {
        const { scene, ground } = memory;
        const pickInfo = scene.pick(p.x, p.y, mesh => mesh === ground);
        if (pickInfo.hit) {
          const floorPoint = toGlobalCoord(parentView)(pickInfo.pickedPoint);
          return Maybe.some(Vec2.of(floorPoint.x, floorPoint.y));
        }
        return Maybe.none();
      })
      .orNull();
  }

  /**
   *
   * @param {*} polygon: Array<Vec2>
   * @param {*} parentView
   */
  isItemInsideBox(polygon, parentView) {
    return ({ item }) => {
      const type = item.getType();
      if (
        type === GlobalRef.TYPE ||
        type === Map.TYPE ||
        type === GraphItem.TYPE
      )
        return false;
      const { mesh } = item;
      return this.isMeshInsideBox(polygon, parentView)(mesh);
    };
  }

  /**
   *
   * @param {*} polygon: Array<Vec2>
   * @param {*} parentView
   */
  isMeshInsideBox(polygon, parentView) {
    return mesh => {
      const p = toGlobalCoord(parentView)(mesh.absolutePosition);
      const planeP = new Vec2(p.x, p.y);
      return this.isPointInsideBox(polygon)(planeP);
    };
  }

  /**
   *
   * @param {*} polygon: Array<Vec2>
   * @param {*} epsilon: Number
   */
  isPointInsideBox(polygon, epsilon = 1e-3) {
    return p => {
      let theta = 0;
      const n = polygon.length;
      for (let i = 0; i < n; i++) {
        const vi = polygon[i].sub(p);
        const vii = polygon[(i + 1) % n].sub(p);
        theta += Math.acos(vi.dot(vii) / (vi.length() * vii.length()));
      }
      return Math.abs(theta - 2 * Math.PI) < epsilon;
    };
  }

  buildPlaceholder(arrayOfMeshes, parentView) {
    SelectionPlaceHolder.ofMainView(parentView).clear().push(arrayOfMeshes);
  }

  clearPlaceholder(parentView) {
    SelectionPlaceHolder.ofMainView(parentView).clear();
  }

  createSelectionDiv(e) {
    this.startDivPos = this.findMouseInDom(e);
    const { x, y } = this.startDivPos;
    const outerDiv = document.createElement("div");
    outerDiv.id = ID;
    document.body.appendChild(outerDiv);
    ReactDOM.render(
      <SelectDiv left={x} top={y}></SelectDiv>,
      document.getElementById(ID)
    );
  }

  updateSelectionDiv(e) {
    const newMouse = this.findMouseInDom(e);
    const oldMouse = this.startDivPos;
    const { x: minX, y: minY } = newMouse.op(oldMouse, Math.min);
    const { x: maxX, y: maxY } = newMouse.op(oldMouse, Math.max);
    const outerDiv = document.getElementById(ID);
    if (!outerDiv) return;
    ReactDOM.render(
      <SelectDiv
        left={minX}
        top={minY}
        width={maxX - minX}
        height={maxY - minY}
        style={{ zIndex: 999 }}
      ></SelectDiv>,
      outerDiv
    );
  }

  destroySelectionDiv() {
    const outerDiv = document.getElementById(ID);
    if (!outerDiv) return;
    outerDiv.parentNode.removeChild(outerDiv);
  }

  findMouseInDom(e) {
    const x = e.clientX; //x position within the element.
    const y = e.clientY; //y position within the element.
    return new Vec2(x, y);
  }
}

const SelectDiv = ({ left, top, width, height, style }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: top,
        left: left,
        width: width,
        height: height,
        borderRadius: 10,
        border: "solid",
        borderColor: "#c7c7c7",
        ...style
      }}
    ></div>
  );
};

SelectDiv.defaultProps = {
  left: 0,
  top: 0,
  width: 0,
  height: 0
};

const toGlobalCoord = Util3d.toGlobalCoord;
const ID = "SELECTION_TOOL_ID";
export default SelectionToolAction;
