import Util3d from "../Util3d/Util3d";
import Vec3 from "../Math/Vec3";
import { Maybe } from "monet";
import MouseKeysAction from "./MouseKeysAction";
import React from "react";
import { Vector3 } from "@babylonjs/core";
import { UndoManager } from "mov-fe-lib-core";
import Clipboard from "../Utils/Clipboard";
import { selectOneAction } from "../Utils/Utils";
import SelectionPlaceHolder from "../Util3d/SelectionPlaceHolder";
import MeshSelector from "../MainView/MeshSelector";
import Vec2 from "../Math/Vec2";
import ReactDOM from "react-dom";
import TreeObject from "../TreeObject/TreeObject";
import GlobalRef from "../NodeItem/GlobalRef";
import GraphItem from "../NodeItem/GraphItem";
import Map from "../NodeItem/Map";

class DragObjectsAction extends MouseKeysAction {
  constructor() {
    super();
    this.key = "dragObject";
    this.name = "Grab Objects [1]";
    this.icon = props => <i className="far fa-hand-paper" {...props}></i>;
    this.maybeSelectedMesh = Maybe.none();
    this.clickPointInWorld = Vec3.ZERO;
    this.movePointInWorld = Vec3.ZERO;
    this.startDivPos = Vec2.ZERO;
    this.corners = [];
  }

  action = parentView => {
    super.action(parentView);
    parentView.setSelectedAction(this);
  };

  onPointerDown = (evt, parentView) => {
    if (!(evt.buttons === 1 || evt.buttons === 2)) return;
    parentView.getSceneMemory().forEach(({ scene, ground }) => {
      this.maybeSelectedMesh = Util3d.pickMesh(scene, ground);
      this.maybeSelectedMesh.forEach(currentMesh =>
        this.dragDownMesh(currentMesh, parentView, evt)
      );
      this.maybeSelectedMesh.orLazy(() => {
        this.dragDownWithoutMesh(parentView, evt);
      });
    });
  };

  onPointerMove = (evt, parentView) => {
    if (!(evt.buttons === 1)) return;
    parentView.getSceneMemory().forEach(({ scene, ground }) => {
      // check that a mesh was selected
      this.maybeSelectedMesh.forEach(selectedMesh => {
        Util3d.getGroundPosition(scene, ground).forEach(groundPos => {
          this.dragMoveMesh(parentView, groundPos);
        });
      });
      this.maybeSelectedMesh.orLazy(() => {
        this.dragMoveWithoutMesh(evt);
      });
    });
  };

  onPointerUp = (evt, parentView) => {
    parentView.getSceneMemory().forEach(({ camera, scene, ground, canvas }) => {
      this.maybeSelectedMesh.forEach(selectedMesh => {
        this.dragUpMesh(selectedMesh, parentView, scene, ground);
      });
      this.maybeSelectedMesh.orLazy(() => {
        this.dragUpWithoutMesh(parentView, scene);
      });
      // reset action
      camera.attachControl(canvas, true);
      this.maybeSelectedMesh = Maybe.none();
      this.destroySelectionDiv();
      this.corners = [];
    });
  };

  onKeyUp = (evt, parentView) => {
    const defaultAction = () => super.onKeyUp(evt, parentView);
    const predicateActionList = [
      {
        predicate: e => ["Backspace", "Delete"].includes(e.code),
        action: this.getDeleteButtonAction(parentView)
      },
      {
        predicate: e => e.ctrlKey && e.code === "KeyC",
        action: this.getCopyAction(parentView)
      },
      {
        predicate: e => e.ctrlKey && e.code === "KeyV",
        action: this.getPasteAction(parentView)
      }
    ];
    selectOneAction(predicateActionList, defaultAction)(evt);
  };

  //========================================================================================
  /*                                                                                      *
   *                                         UTILS                                        *
   *                                                                                      */
  //========================================================================================

  dragDownMesh(currentMesh, parentView, evt) {
    parentView.getSceneMemory().forEach(({ camera, canvas, scene, ground }) => {
      camera.detachControl(canvas);
      this.addSelectedMesh(evt, currentMesh, parentView);
      this.handleMeshRightClick(evt, parentView, currentMesh);
      Util3d.getGroundPosition(scene, ground).forEach(groundPos => {
        this.updateMouseVars(groundPos);
        // mesh onClick
        currentMesh.onClick
          ? currentMesh.onClick()
          : parentView.closeContextDial();

        if (currentMesh.isSelectionPlaceHolder) {
          parentView.addGizmo2Mesh(
            currentMesh,
            () =>
              this.notifyObservers(currentMesh, true, Vec3.ZERO, parentView),
            () =>
              this.notifyObservers(currentMesh, false, Vec3.ZERO, parentView)
          );
        } else {
          this.selectMeshUpdateUI(parentView);
        }
      });
    });
  }

  selectMeshUpdateUI(parentView) {
    const meshSelector = MeshSelector.ofMainView(parentView);
    const selectionPlaceHolder = SelectionPlaceHolder.ofMainView(parentView);
    const selectedMeshes = meshSelector.meshes();
    parentView.highlightMeshesInScene(selectedMeshes);
    parentView.highlightNodesInTree(selectedMeshes.map(({ name }) => name));
    if (selectedMeshes.length > 1) {
      parentView.addGizmo2Name();
      selectionPlaceHolder.clear();
      selectionPlaceHolder.push(selectedMeshes);
      this.setProperties(parentView, selectedMeshes[0].name);
    } else {
      selectionPlaceHolder.clear();
      parentView.addGizmo2Name();
      selectedMeshes.forEach(mesh => {
        parentView.addGizmo2Name(mesh.name);
        this.setProperties(parentView, mesh.name);
      });
    }
  }

  dragDownWithoutMesh(parentView, evt) {
    parentView
      .getMouseCoordsFromRoot()
      .forEach(mousePosRoot =>
        this.handleRightClickWithoutMesh(evt, parentView, mousePosRoot)
      );
    parentView.getSceneMemory().forEach(({ camera, canvas, scene }) => {
      if (evt.shiftKey) {
        camera.detachControl(canvas);
        this.createSelectionDiv(evt);
        this.corners.push(Vec2.of(scene.pointerX, scene.pointerY));
      }
    });
  }

  dragMoveMesh(parentView, groundPos) {
    const meshSelector = MeshSelector.ofMainView(parentView);
    const meshes = meshSelector.meshes();
    const selector = SelectionPlaceHolder.ofMainView(parentView);
    const newMousePosInWorld = Vec3.ofBabylon(groundPos);
    const v = newMousePosInWorld.sub(this.movePointInWorld);
    meshes.forEach(mesh => {
      let vLocal = Util3d.getLocalCoordFromWorld(mesh, v, false);
      vLocal = new Vector3(vLocal.x, vLocal.y, 0);
      mesh.position = mesh.position.add(vLocal);
      this.notifyObservers(mesh, false, v, parentView);
    });
    if (meshes.length > 1) {
      let vLocal = Util3d.getLocalCoordFromWorld(selector.mesh, v, false);
      vLocal = new Vector3(vLocal.x, vLocal.y, 0);
      selector.mesh.position = selector.mesh.position.add(vLocal);
    }
    this.movePointInWorld = newMousePosInWorld;
  }

  dragMoveWithoutMesh(evt) {
    this.updateSelectionDiv(evt);
  }

  dragUpMesh(selectedMesh, parentView, scene, ground) {
    const meshSelector = MeshSelector.ofMainView(parentView);
    const meshes = meshSelector.meshes();
    const selectPlaceHolder = SelectionPlaceHolder.ofMainView(parentView);
    Util3d.getGroundPosition(scene, ground).forEach(groundPos => {
      const groundPosInWorld = Vec3.ofBabylon(groundPos);
      const bigDisplacement = groundPosInWorld.sub(this.clickPointInWorld);
      meshes.forEach(mesh => {
        this.notifyObservers(mesh, true, Vec3.ZERO, parentView);
        parentView.updateNodeInServer(mesh.name);
      });
      this.setProperties(parentView, selectedMesh.name);
      if (bigDisplacement.length() > 0) {
        parentView
          .getUndoManager()
          .addIt(this.getUndoAbleAction(meshes, bigDisplacement, parentView));
      }
      if (selectedMesh.isSelectionPlaceHolder) {
        meshSelector.clear();
        meshSelector.addArray(selectPlaceHolder.arrayOfMeshes);
      }
    });
  }

  dragUpWithoutMesh(parentView, scene) {
    this.selectObjectsInside(scene, parentView);
  }

  handleMeshRightClick = (evt, parentView, mesh) => {
    if (!(evt.buttons === 2)) return;
    if (!mesh || !mesh.getMouseContextActions) return;
    parentView.setMouseContextActions(
      evt,
      mesh.getMouseContextActions(parentView)
    );
  };

  /**
   * @param evt: event
   * @param parentView: MainView
   * @param mousePosFromRoot: Vector3
   */
  handleRightClickWithoutMesh = (evt, parentView, mousePosFromRoot) => {
    if (!(evt.buttons === 2)) return;
    parentView.setMouseContextActions(evt, [
      {
        title: "Paste",
        onClick: this.getPasteOnClick(mousePosFromRoot, parentView)
      }
    ]);
  };

  updateMouseVars(groundPos) {
    const groundPosInGlobal = Vec3.ofBabylon(groundPos);
    this.movePointInWorld = groundPosInGlobal;
    this.clickPointInWorld = groundPosInGlobal;
  }

  addSelectedMesh(evt, currentMesh, parentView) {
    const meshSelector = MeshSelector.ofMainView(parentView);
    // is an edge mesh
    if (!!currentMesh.edgeIndexes) {
      meshSelector.clear();
      meshSelector.add(currentMesh);
      return;
    }
    // not an edge mesh
    meshSelector.filter(mesh => !mesh.edgeIndexes);
    if (evt.shiftKey) {
      meshSelector.add(currentMesh);
    } else {
      if (meshSelector.has(currentMesh)) return;
      meshSelector.clear();
      meshSelector.add(currentMesh);
    }
  }

  getPasteOnClick = (mousePosFromRoot, parentView) => () => {
    const pasteAction = Clipboard.paste();
    if (pasteAction && typeof pasteAction === "function") {
      pasteAction(mousePosFromRoot, parentView);
    }
  };

  getDeleteButtonAction(parentView) {
    return () => {
      const meshSelector = MeshSelector.ofMainView(parentView);
      const meshes = meshSelector.meshes();
      const isOne = meshes.length === 1;
      meshes.forEach(mesh => {
        const maybeNode = parentView.getNodeFromTree(mesh.name);
        maybeNode.forEach(node => parentView.onDeleteNode(node, isOne, isOne));
        maybeNode.orElseRun(() => {
          //TODO REFACTOR THIS;
          if (!isOne) return;
          const contextActions = parentView.getContextActions();
          !!contextActions[0] && contextActions[0].action(parentView);
        });
      });
      parentView.highlightNodesInTree();
      parentView.highlightMeshesInScene();
      parentView.addGizmo2Mesh();
      meshSelector.clear();
      SelectionPlaceHolder.ofMainView(parentView).clear();
      parentView.forceUpdate();
    };
  }

  getCopyAction(parentView) {
    const meshSelector = MeshSelector.ofMainView(parentView);
    const meshes = meshSelector.meshes();
    const selectPlaceHolder = SelectionPlaceHolder.ofMainView(parentView).mesh;
    return () => {
      if (meshes.length <= 1) {
        meshes
          .filter(mesh => !!mesh.nodeItem)
          .map(mesh => mesh.nodeItem)
          .forEach(item => {
            Clipboard.copy((mousePosFromRoot, someMainView) => {
              item
                .getCopyFunction()(mousePosFromRoot, someMainView)
                .forEach(({ mesh: copiedMesh }) => {
                  someMainView.addGizmo2Name(copiedMesh.name);
                  someMainView.highlightMeshesInScene([copiedMesh]);
                  someMainView.highlightNodesInTree([copiedMesh.name]);
                  MeshSelector.ofMainView(someMainView).clear().add(copiedMesh);
                });
            });
          });
      } else {
        const nodeCopyActionPairs = meshes
          .filter(mesh => !!mesh.nodeItem)
          .map(mesh => mesh.nodeItem)
          .reduce((nodeActionPairs, nodeItem) => {
            nodeActionPairs.push([nodeItem, nodeItem.getCopyFunction(false)]);
            return nodeActionPairs;
          }, []);
        Clipboard.copy((mousePosFromRoot, someMainView) => {
          const maybeCopiedItems = nodeCopyActionPairs.map(
            ([nodeItem, copyAction]) => {
              const displacement = Util3d.toGlobalCoord(parentView)(
                nodeItem.mesh.absolutePosition
              ).subtract(selectPlaceHolder.position);
              return copyAction(
                displacement.add(mousePosFromRoot),
                someMainView
              );
            }
          );
          const copiedItems = maybeCopiedItems
            .filter(maybe => maybe.isSome())
            .map(maybe => maybe.some());
          const copiedMeshes = copiedItems.map(({ mesh }) => mesh);
          const copiedNames = copiedItems.map(({ name }) => name);
          someMainView.addGizmo2Name();
          someMainView.highlightMeshesInScene(copiedMeshes);
          someMainView.highlightNodesInTree(copiedNames);
          MeshSelector.ofMainView(someMainView).clear().addArray(copiedMeshes);
          SelectionPlaceHolder.ofMainView(someMainView)
            .clear()
            .push(copiedMeshes);
          someMainView.forceUpdate();
        });
      }
    };
  }

  getPasteAction(parentView) {
    return () => {
      parentView
        .getMouseCoordsFromRoot()
        .forEach(mousePosRoot =>
          this.getPasteOnClick(mousePosRoot, parentView)()
        );
    };
  }

  /**
   *
   * @param {*} mesh: Mesh
   * @param {*} is2updateServer: Boolean
   * @param {*} displacement: Vec3 in world coordinates
   */
  notifyObservers(mesh, is2updateServer, displacement, parentView) {
    // notify  babylonjs observers
    Maybe.fromNull(mesh.observers).forEach(obs => {
      obs.notifyObservers({
        updatedPointMesh: mesh,
        is2updateServer: is2updateServer,
        displacement: displacement.toBabylon()
      });
    });
    // notify graph observers
    Maybe.fromNull(mesh.graphVertex).forEach(({ vertexObs }) => {
      vertexObs({
        updatedPointMesh: mesh,
        is2updateServer: is2updateServer,
        displacement: displacement.toBabylon()
      });
    });
    if (parentView.getNodeFromTree(mesh.name).isSome()) {
      mesh._children
        .filter(
          m =>
            (!!m.observers || !!m.graphVertex) &&
            parentView.getNodeFromTree(m.name).isSome()
        )
        .forEach(m =>
          this.notifyObservers(m, is2updateServer, displacement, parentView)
        );
    }
  }

  setProperties = (parentView, name) => parentView.setPropertiesWithName(name);

  /**
   *
   * @param {*} selectedMeshes: Array<Mesh>
   * @param {*} displacement: Vec3 in world coordinates
   * @param {*} parentView: MainView
   */
  getUndoAbleAction(selectedMeshes, displacement, parentView) {
    return UndoManager.actionBuilder()
      .doAction(() => {
        selectedMeshes.forEach(mesh => {
          const localDisplacement = Util3d.getLocalCoordFromWorld(
            mesh,
            displacement,
            false
          );
          const newPos = Vec3.ofBabylon(mesh.position).add(localDisplacement);
          mesh.position = newPos.toBabylon();
          this.notifyObservers(mesh, true, displacement, parentView);
          parentView.updateNodeInServer(mesh.name);
        });
      })
      .undoAction(() => {
        selectedMeshes.forEach(mesh => {
          const invertDisplacement = displacement.scale(-1);
          const localDisplacement = Util3d.getLocalCoordFromWorld(
            mesh,
            invertDisplacement,
            false
          );
          const newPos = Vec3.ofBabylon(mesh.position).add(localDisplacement);
          mesh.position = newPos.toBabylon();
          this.notifyObservers(mesh, true, invertDisplacement, parentView);
          parentView.updateNodeInServer(mesh.name);
        });
      })
      .build();
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
    const meshSelector = MeshSelector.ofMainView(parentView);
    meshSelector.clear();
    if (insideBoxDragAbleMeshes.length !== 0) {
      meshSelector.addArray(insideBoxDragAbleMeshes, false);
    }
    this.selectMeshUpdateUI(parentView);
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
          const floorPoint = Util3d.toGlobalCoord(parentView)(
            pickInfo.pickedPoint
          );
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
        type === GraphItem.TYPE ||
        item?.mesh?.isSelectionPlaceHolder
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
      const p = Util3d.toGlobalCoord(parentView)(mesh.absolutePosition);
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
}

//========================================================================================
/*                                                                                      *
 *                                     SELECTION DIV                                    *
 *                                                                                      */
//========================================================================================

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
const ID = "SELECTION_TOOL_ID";
//========================================================================================
/*                                                                                      *
 *                                        EXPORT                                        *
 *                                                                                      */
//========================================================================================

export default DragObjectsAction;
