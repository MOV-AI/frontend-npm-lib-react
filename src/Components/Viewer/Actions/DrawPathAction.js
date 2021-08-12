import Util3d from "../Util3d/Util3d";
import Vec3 from "../Math/Vec3";
import Path from "../NodeItem/Path";
import MouseKeysAction from "./MouseKeysAction";
import React from "react";
import { Color3 } from "@babylonjs/core";
import { UndoManager } from "mov-fe-lib-core";
import { selectOneAction } from "../Utils/Utils";
import Constants from "../Utils/Constants";

class DrawPathAction extends MouseKeysAction {
  constructor() {
    super();
    this.key = "drawPath";
    this.name = "Draw Path [2]";
    this.icon = props => <i className="fas fa-bezier-curve" {...props}></i>;
    this.mouseCurve = [];
    this.spherePlaceHolder = { dispose: () => {}, isDisposed: () => true };
  }

  action = parentView => {
    super.action(parentView);
    parentView.setSelectedAction(this);
  };

  onChange = parentView => {
    if (this.mouseCurve.length > 1) {
      parentView.getSceneMemory().forEach(({ scene }) => {
        parentView
          .getUndoManager()
          .doIt(
            this.getUndoAbleEnterAction(this.mouseCurve, scene, parentView)
          );
      });
    }
  };

  onPointerDown = (evt, parentView) => {
    if (!(evt.buttons === 1)) return;
    if (!this.spherePlaceHolder.isDisposed()) {
      this.createPointInCurve(parentView);
      return;
    }
    parentView.getSceneMemory().forEach(memory => {
      const { scene, ground, camera, canvas } = memory;
      const maybeMousePos = Util3d.getGroundPosition(scene, ground);
      maybeMousePos.forEach(mousePos => {
        camera.detachControl(canvas);
        this.mouseCurve.push(mousePos);
        parentView
          .getUndoManager()
          .doIt(
            this.getUndoAbleClickAction(
              this.mouseCurve,
              scene,
              parentView,
              memory
            )
          );
      });
    });
  };

  getUndoAbleClickAction = (
    keyPoints,
    scene,
    parentView,
    { camera, canvas }
  ) => {
    const kps = keyPoints.map(x => Vec3.ofBabylon(x));
    return UndoManager.actionBuilder()
      .doAction(() => {
        const finalKps = kps.length === 1 ? [kps[0], kps[0]] : [...kps];
        parentView.deleteNodeFromTreeUsingName(TEMP_PATH_NAME, false, false);
        this.createCurve(finalKps, TEMP_PATH_NAME, scene, parentView, false);
        if (kps.length <= 2) {
          parentView.setContextActions(
            this.getDrawPathContextAction(camera, canvas, scene)
          );
        }
        this.mouseCurve = [...kps];
      })
      .undoAction(({ is2UpdateInServer = true }) => {
        parentView.deleteNodeFromTreeUsingName(
          TEMP_PATH_NAME,
          is2UpdateInServer
        );
        const reducedKps = kps.slice(0, kps.length - 1);
        const finalKps =
          reducedKps.length === 1 ? [reducedKps[0], reducedKps[0]] : reducedKps;
        if (is2UpdateInServer) {
          reducedKps.length > 0 &&
            this.createCurve(
              finalKps,
              TEMP_PATH_NAME,
              scene,
              parentView,
              false
            );
          this.mouseCurve = reducedKps;
        } else {
          this.mouseCurve = [];
        }
      })
      .build();
  };

  onPointerMove = (evt, parentView) => {
    this.addKeyPointPlaceHolder(parentView);
  };

  onPointerUp = (evt, parentView) => {
    // empty
  };

  onKeyUp = (evt, parentView) => {
    parentView.getSceneMemory().forEach(memory => {
      const { scene, camera, canvas } = memory;
      const contextActions = this.getDrawPathContextAction(
        camera,
        canvas,
        scene
      );
      const actions = [
        {
          predicate: e => e.code === "Enter" || e.code === "NumpadEnter",
          action: () => contextActions[1].action(parentView)
        },
        {
          predicate: e => e.code === "Delete" || e.code === "Backspace",
          action: () => contextActions[0].action(parentView)
        },
        {
          predicate: e => e.code === "Escape",
          action: () => {
            contextActions[0].action(parentView);
          }
        }
      ];
      selectOneAction(actions)(evt);
    });
  };

  /**
   *
   * @param {*} curve: Array<Vector3>
   * @param {*} name: String
   * @param {*} scene: Scene
   * @param {*} parentView: MainView
   * @param {*} is2addInServer: Boolean
   * @param {*} color: Color3
   */
  createCurve = (
    curve,
    name,
    scene,
    parentView,
    is2addInServer = true,
    color = Color3.Gray()
  ) => {
    const rootMesh = parentView.getRootNode().item.mesh;
    const localCurve = Util3d.toGlobalCoord(parentView)(curve);
    const middlePoint = Util3d.pointAverage(localCurve);
    const centeredCurve = localCurve.map(w => w.subtract(middlePoint));

    const pathItem = Path.ofDict(
      scene,
      {
        name: name,
        position: Vec3.ofBabylon(middlePoint).toArray(),
        color: [color.r, color.g, color.b],
        localPath: centeredCurve.map(z => Vec3.ofBabylon(z).toArray())
      },
      parentView
    );
    pathItem.mesh.parent = rootMesh;
    parentView.addNodeItem2Tree(
      pathItem,
      rootMesh.name,
      is2addInServer,
      true,
      is2addInServer
    );
    return pathItem;
  };

  getDrawPathContextAction = (camera, canvas, scene) => {
    const ans = [];
    ans.push({
      icon: props => <i className="fas fa-trash" {...props}></i>,
      action: parentView => {
        camera.attachControl(canvas, true);
        parentView.deleteNodeFromTreeUsingName(TEMP_PATH_NAME, false);
        this.mouseCurve = [];
        parentView.closeContextDial();
      },
      name: "Clear Path [ESC | DEL | Backspace]"
    });
    if (this.mouseCurve.length > 1) {
      ans.push({
        icon: props => <i className="fas fa-check" {...props}></i>,
        action: parentView => {
          camera.attachControl(canvas, true);
          parentView
            .getUndoManager()
            .doIt(
              this.getUndoAbleEnterAction(this.mouseCurve, scene, parentView)
            );
        },
        name: "Create Path [Enter]"
      });
    }
    return ans;
  };

  getUndoAbleEnterAction(keyPoints, scene, parentView) {
    const kps = [...keyPoints];
    const name = `Path${Math.floor(Math.random() * 1e3)}`;
    return UndoManager.actionBuilder()
      .doAction(() => {
        parentView.deleteNodeFromTreeUsingName(TEMP_PATH_NAME, false);
        const pathItem = this.createCurve(kps, name, scene, parentView, true);
        this.mouseCurve = [];
        parentView.setPropertiesWithName(name);
        parentView.closeContextDial();
        if (pathItem && pathItem.keyPoints) {
          const keyPointMeshes = pathItem.keyPoints;
          Path.addEdgesInKeyPoints(keyPointMeshes, scene, parentView);
        }
      })
      .undoAction(({ is2UpdateInServer = true }) => {
        this.deleteEdgeInKeyPoints(name, parentView, is2UpdateInServer);
        parentView.deleteNodeFromTreeUsingName(name, is2UpdateInServer);
        if (is2UpdateInServer) {
          this.createCurve(kps, TEMP_PATH_NAME, scene, parentView, false);
          this.mouseCurve = kps;
        } else {
          this.mouseCurve = [];
          parentView.deleteNodeFromTreeUsingName(TEMP_PATH_NAME, false);
        }
      })
      .build();
  }

  deleteEdgeInKeyPoints(pathName, parentView, is2UpdateInServer = true) {
    parentView.getGraph().forEach(({ item: graph }) => {
      parentView.getNodeFromTree(pathName).forEach(({ item: pathItem }) => {
        const keyPointMeshes = pathItem.keyPoints;
        const edgeMeshes = [
          keyPointMeshes[0],
          keyPointMeshes[keyPointMeshes.length - 1]
        ];
        graph.delEdge(...edgeMeshes);
        if (is2UpdateInServer) parentView.updateNodeInServer(graph.name);
      });
    });
  }

  addKeyPointPlaceHolder(parentView) {
    this.spherePlaceHolder.dispose();
    parentView.getSceneMemory().forEach(({ scene, ground }) => {
      Util3d.pickMesh(scene, ground).forEach(mesh => {
        if (mesh.name === TEMP_PATH_NAME) return;
        parentView.getNodeFromTree(mesh.name).forEach(({ item: nodeItem }) => {
          if (nodeItem.getType() === Path.TYPE) {
            Util3d.getGroundPosition(scene, ground).forEach(groundPos => {
              const rootMesh = parentView.getRootNode().item.mesh;
              this.spherePlaceHolder = Util3d.createSphere(
                scene,
                Color3.Gray(),
                Constants.RADIUS,
                "sphereInsertPlaceHolder",
                false
              );
              this.spherePlaceHolder.parent = rootMesh;
              this.spherePlaceHolder.position = Util3d.toGlobalCoord(
                parentView
              )(groundPos);
              this.spherePlaceHolder.visibility = 0.5;
            });
          }
        });
      });
    });
  }

  createPointInCurve(parentView) {
    parentView.getSceneMemory().forEach(({ scene, ground }) => {
      // dispose mesh before pick mesh
      this.spherePlaceHolder.dispose();
      // it can be shown that the picked mesh is the curve we want to edit
      Util3d.pickMesh(scene, ground).forEach(({ name }) => {
        parentView.getNodeFromTree(name).forEach(({ item: pathItem }) => {
          Util3d.getGroundPosition(scene, ground).forEach(groundPos => {
            const oldPoints = [...pathItem.localPath].map(p =>
              Vec3.of(p).toBabylon()
            );
            const oldPosition = pathItem.mesh.position;
            parentView.getUndoManager().doIt(
              UndoManager.actionBuilder()
                .doAction(() => {
                  this.insertPointInCurve(
                    scene,
                    parentView,
                    pathItem,
                    groundPos
                  );
                  parentView.updateNodeInServer(pathItem.name);
                })
                .undoAction(({ is2UpdateInServer = true }) => {
                  Path.createNewMeshFromOldUsingNewPoints(
                    oldPoints,
                    scene,
                    pathItem,
                    parentView,
                    Path.onAddNewPointKeyPointUpdate
                  );
                  pathItem.mesh.position = oldPosition;
                  if (is2UpdateInServer)
                    parentView.updateNodeInServer(pathItem.name);
                })
                .build()
            );
          });
        });
      });
    });
  }

  insertPointInCurve(scene, parentView, pathItem, groundPosInWorld) {
    const localGround = Util3d.getLocalCoordFromWorld(
      { parent: pathItem.mesh },
      Vec3.ofBabylon(groundPosInWorld)
    );
    const localPath = pathItem.localPath.map(p => Vec3.of(p));
    const sortedDistances = localPath
      .map((p, i) => ({
        distance: localGround.sub(p).length(),
        index: i
      }))
      .sort((a, b) => a.distance - b.distance);
    // all paths have 2 points at least
    const minIndex = Math.min(
      sortedDistances[0].index,
      sortedDistances[1].index
    );
    const localPathB = localPath.map(p => p.toBabylon());
    const newPoints = [
      ...localPathB.slice(0, minIndex + 1),
      localGround.toBabylon(),
      ...localPathB.slice(minIndex + 1)
    ];
    Path.createNewMeshFromOldUsingNewPoints(
      newPoints,
      scene,
      pathItem,
      parentView,
      Path.onAddNewPointKeyPointUpdate
    );
  }
}

const TEMP_PATH_NAME = "temp_curve";
export default DrawPathAction;
