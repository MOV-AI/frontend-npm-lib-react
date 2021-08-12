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
import Path from "../NodeItem/Path";

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
    if (!(evt.buttons === 1 || evt.buttons === 2) || evt.ctrlKey) return;
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
    if (!(evt.buttons === 1) || evt.ctrlKey) return;
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
    const predicateActionList = [
      {
        predicate: e => ["Backspace", "Delete"].includes(e.code),
        action: this.getDeleteAction(parentView)
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
    selectOneAction(predicateActionList)(evt);
  };

  //========================================================================================
  /*                                                                                      *
   *                                         UTILS                                        *
   *                                                                                      */
  //========================================================================================

  dragDownMesh(currentMesh, parentView, evt) {
    if (currentMesh.isStatic) return;
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
            () => {
              this.notifyObservers(currentMesh, false, Vec3.ZERO, parentView);
            },
            () => {
              this.notifyObservers(currentMesh, true, Vec3.ZERO, parentView);
            }
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
      const isBigDisplacement = bigDisplacement.length() > 1e-3;
      meshes.forEach(mesh => {
        // TODO: find better way without edge if
        const isBigDisplaceOrIsEdgeMesh =
          isBigDisplacement || !!mesh.edgeIndexes;
        this.notifyObservers(
          mesh,
          isBigDisplaceOrIsEdgeMesh,
          Vec3.ZERO,
          parentView
        );
        if (isBigDisplacement) parentView.updateNodeInServer(mesh.name);
      });
      this.setProperties(parentView, selectedMesh.name);
      if (isBigDisplacement) {
        parentView
          .getUndoManager()
          .addIt(this.getUndoAbleAction(meshes, bigDisplacement, parentView));
      }
      if (selectedMesh.isSelectionPlaceHolder) {
        meshSelector.clear();
        meshSelector.addArray(selectPlaceHolder.arrayOfMeshes);
      }
      this.mergePathsIfAny(selectedMesh, parentView, scene, ground);
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

  getDeleteAction(parentView) {
    return () => {
      const meshSelector = MeshSelector.ofMainView(parentView);
      const meshes = meshSelector.meshes();
      const isOne = meshes.length === 1;
      meshes.forEach(mesh => {
        const maybeNode = parentView.getNodeFromTree(mesh.name);
        maybeNode.forEach(node => parentView.onDeleteNode(node, isOne, isOne));
        maybeNode.orElseRun(() => {
          if (!isOne) return;
          mesh.onDel && mesh.onDel();
        });
      });
      parentView.highlightNodesInTree();
      parentView.highlightMeshesInScene();
      parentView.addGizmo2Mesh();
      meshSelector.clear();
      SelectionPlaceHolder.ofMainView(parentView).clear();
      parentView.renderMenus();
    };
  }

  getCopyAction(parentView) {
    const meshSelector = MeshSelector.ofMainView(parentView);
    const meshes = meshSelector.meshes();
    const selectPlaceHolderMesh = SelectionPlaceHolder.ofMainView(parentView)
      .mesh;
    return () => {
      if (meshes.length <= 1) {
        this.copyOne(meshes);
      } else {
        this.copyMany(meshes, selectPlaceHolderMesh);
      }
    };
  }

  copyOne(meshes) {
    Clipboard.copy((mousePosFromRoot, someMainView) => {
      const uuid = Clipboard.getUID();
      const itemCopyFunctions = meshes
        .filter(mesh => !!mesh.nodeItem)
        .map(mesh => mesh.nodeItem)
        .map(item => item.getCopyFunction(true, name => name + "_copy" + uuid));
      if (itemCopyFunctions.length === 0) return;
      const doAction = () => {
        const maybeCopiedItem = itemCopyFunctions[0](
          mousePosFromRoot,
          someMainView
        );
        maybeCopiedItem.forEach(item => {
          const copiedMesh = item.mesh;
          someMainView.addGizmo2Name(copiedMesh.name);
          someMainView.highlightMeshesInScene([copiedMesh]);
          someMainView.highlightNodesInTree([copiedMesh.name]);
          MeshSelector.ofMainView(someMainView).clear().add(copiedMesh);
          someMainView.setProperties(item.toForm());
          someMainView.renderMenus();
        });
        return maybeCopiedItem;
      };
      const maybeCopiedItem = doAction();
      someMainView.getUndoManager().addIt(
        UndoManager.actionBuilder()
          .doAction(doAction)
          .undoAction(() => {
            maybeCopiedItem.forEach(({ mesh: copiedMesh }) => {
              someMainView.deleteNodeFromTreeUsingName(copiedMesh.name);
              someMainView.highlightMeshesInScene();
              someMainView.highlightNodesInTree();
              someMainView.renderMenus();
            });
          })
          .build()
      );
    });
  }

  copyMany(meshes, selectPlaceHolderMesh) {
    Clipboard.copy((mousePosFromRoot, someMainView) => {
      const nodeItems = meshes
        .filter(mesh => !!mesh.nodeItem)
        .map(mesh => mesh.nodeItem);
      const uuids = nodeItems.map(() => Clipboard.getUID());
      const itemCopyFunctions = nodeItems.map((item, i) =>
        item.getCopyFunction(false, name => name + "_copy" + uuids[i])
      );
      const doAction = () => {
        const maybeCopiedItems = itemCopyFunctions.map(
          (itemCopyFunction, i) => {
            const displacement = Util3d.toGlobalCoord(someMainView)(
              nodeItems[i].mesh.absolutePosition
            ).subtract(selectPlaceHolderMesh.position);
            return itemCopyFunction(
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
        someMainView.renderMenus();
        someMainView.forceUpdate();
        return copiedItems;
      };
      const copiedItems = doAction();
      someMainView.getUndoManager().addIt(
        UndoManager.actionBuilder()
          .doAction(doAction)
          .undoAction(() => {
            copiedItems.forEach(({ mesh }) => {
              someMainView.deleteNodeFromTreeUsingName(mesh.name, true, false);
            });
            someMainView.highlightMeshesInScene();
            someMainView.highlightNodesInTree();
            MeshSelector.ofMainView(someMainView).clear();
            SelectionPlaceHolder.ofMainView(someMainView).clear();
            someMainView.renderMenus();
            someMainView.forceUpdate();
          })
          .build()
      );
    });
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
      this.notifyChildrenObserversRecursively(
        mesh?._children || [],
        is2updateServer,
        displacement,
        parentView
      );
    }
  }

  notifyChildrenObserversRecursively = (
    nodeTree,
    is2updateServer,
    displacement,
    parentView
  ) => {
    nodeTree.forEach(m => {
      if (
        (!!m.observers || !!m.graphVertex) &&
        parentView.getNodeFromTree(m.name).isSome()
      ) {
        this.notifyObservers(m, is2updateServer, displacement, parentView);
      }
      if (m._children && m._children.length)
        this.notifyChildrenObserversRecursively(
          m._children,
          is2updateServer,
          displacement,
          parentView
        );
    });
  };

  setProperties = (parentView, name) => parentView.setPropertiesWithName(name);

  /**
   *
   * @param {*} selectedMeshes: Array<Mesh>
   * @param {*} displacement: Vec3 in world coordinates
   * @param {*} parentView: MainView
   */
  getUndoAbleAction(selectedMeshes, displacement, parentView) {
    const meshesStruct = [...selectedMeshes].map(m => ({
      mesh: m,
      parent: m.parent,
      keypointIndex: m.index || -1
    }));
    const sendMesh = (mesh, finalDisplacement, is2UpdateInServer = true) => {
      const localDisplacement = Util3d.getLocalCoordFromWorld(
        mesh,
        finalDisplacement,
        false
      );
      const newPos = Vec3.ofBabylon(mesh.position).add(localDisplacement);
      mesh.position = newPos.toBabylon();
      this.notifyObservers(
        mesh,
        is2UpdateInServer,
        finalDisplacement,
        parentView
      );
    };
    const moveMesh = (dir = 1, is2UpdateInServer = true) => ({
      mesh,
      parent,
      keypointIndex
    }) => {
      const finalDisplacement = displacement.scale(dir);
      let maybeNodeItem = Maybe.None();
      if (keypointIndex >= 0) {
        maybeNodeItem = parentView.getNodeFromTree(parent.name);
        maybeNodeItem.forEach(({ item }) => {
          const nodeMesh = item.keyPoints[keypointIndex];
          sendMesh(nodeMesh, finalDisplacement, is2UpdateInServer);
          if (is2UpdateInServer) parentView.updateNodeInServer(item.name);
        });
        maybeNodeItem.orElseRun(() => {});
      } else {
        maybeNodeItem = parentView.getNodeFromTree(mesh.name);
        maybeNodeItem.forEach(({ item }) => {
          const nodeMesh = item.mesh;
          sendMesh(nodeMesh, finalDisplacement, is2UpdateInServer);
          if (is2UpdateInServer) parentView.updateNodeInServer(nodeMesh.name);
        });
      }
      maybeNodeItem.orElseRun(() => {
        sendMesh(mesh, finalDisplacement, is2UpdateInServer);
        if (is2UpdateInServer) parentView.updateNodeInServer(mesh.name);
      });
    };
    return UndoManager.actionBuilder()
      .doAction(() => {
        meshesStruct.forEach(moveMesh());
      })
      .undoAction(({ is2UpdateInServer = true }) => {
        meshesStruct.forEach(moveMesh(-1, is2UpdateInServer));
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

  /**
   *
   * Merge paths if boundary keypoints are dragged together and have same orientation
   *
   * @param {*} selectedMesh
   * @param {*} parentView
   * @param {*} scene
   * @param {*} ground
   * @returns
   */
  mergePathsIfAny(selectedMesh, parentView, scene, ground) {
    if (!Path.isKeyPointMesh(selectedMesh, parentView)) return;
    const pickInfo = scene.pick(
      scene.pointerX,
      scene.pointerY,
      mesh => mesh !== ground && mesh.isEnabled()
    );
    if (pickInfo.hit) {
      const ray = pickInfo.ray;
      var hits = scene.multiPickWithRay(ray);
      if (hits) {
        const keyPointHits = hits
          .map(({ pickedMesh }) => pickedMesh)
          .filter(hitMesh => Path.isKeyPointMesh(hitMesh, parentView));
        // Are hits a keypoint of path
        if (keyPointHits.length >= 2) {
          const [first, second] = keyPointHits;
          const left = first.index > second.index ? first : second;
          const right = first.index <= second.index ? first : second;
          // do they belong to the same path
          if (left.parent.name !== right.parent.name) {
            if (Path.areKeyPointsCompatible(left, right, parentView)) {
              parentView
                .getNodeFromTree(left.parent.name)
                .forEach(({ item: firstPath }) => {
                  parentView
                    .getNodeFromTree(right.parent.name)
                    .forEach(({ item: secondPath }) => {
                      const oldPaths = [firstPath, secondPath].map(path => {
                        return {
                          parent: path.mesh.parent,
                          dict: path.toDict(),
                          children: [...path.mesh._children]
                        };
                      });
                      const mergeName = firstPath.name + "_" + secondPath.name;
                      parentView.getUndoManager().doIt(
                        UndoManager.actionBuilder()
                          .doAction(() => {
                            Path.mergePaths(
                              firstPath.name,
                              secondPath.name,
                              mergeName,
                              parentView
                            );
                          })
                          .undoAction(({ is2UpdateInServer = true }) => {
                            Path.unMergePaths(
                              oldPaths,
                              mergeName,
                              parentView,
                              is2UpdateInServer
                            );
                          })
                          .build()
                      );
                    });
                });
            }
          }
        }
      }
    }
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
