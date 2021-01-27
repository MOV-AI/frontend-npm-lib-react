import Util3d from "../Util3d/Util3d";
import Vec3 from "../Math/Vec3";
import Path from "../NodeItem/Path";
import MouseKeysAction from "./MouseKeysAction";
import React from "react";
import { Color3 } from "@babylonjs/core";
import { UndoManager } from "mov-fe-lib-core";
import { selectOneAction } from "../Utils/Utils";
import GraphItem from "../NodeItem/GraphItem";

class DrawPathAction extends MouseKeysAction {
  constructor() {
    super();
    this.key = "drawPath";
    this.name = "Draw Path [2]";
    this.mouseCurve = [];
    this.icon = props => <i className="fas fa-bezier-curve" {...props}></i>;
  }

  action = parentView => {
    super.action(parentView);
    parentView.setSelectedAction(this);
  };

  onPointerDown = (evt, parentView) => {
    if (!(evt.buttons === 1)) return;
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

  getUndoAbleClickAction(keyPoints, scene, parentView, { camera, canvas }) {
    const kps = [...keyPoints];
    return UndoManager.actionBuilder()
      .doAction(() => {
        const finalKps = kps.length === 1 ? [kps[0], kps[0]] : kps;
        parentView.deleteNodeFromTreeUsingName(TEMP_PATH_NAME, false, false);
        this.createCurve(finalKps, TEMP_PATH_NAME, scene, parentView, false);
        if (kps.length <= 2) {
          parentView.setContextActions(
            this.getDrawPathContextAction(camera, canvas, scene)
          );
        }
        this.mouseCurve = kps;
      })
      .undoAction(() => {
        parentView.deleteNodeFromTreeUsingName(TEMP_PATH_NAME);
        const reducedKps = kps.slice(0, kps.length - 1);
        const finalKps =
          reducedKps.length === 1 ? [reducedKps[0], reducedKps[0]] : reducedKps;
        reducedKps.length > 0 &&
          this.createCurve(finalKps, TEMP_PATH_NAME, scene, parentView, false);
        this.mouseCurve = reducedKps;
      })
      .build();
  }

  onPointerMove = (evt, parentView) => {
    // empty
  };

  onPointerUp = (evt, parentView) => {
    // empty
  };

  onKeyUp = (evt, parentView) => {
    const defaultAction = () => super.onKeyUp(evt, parentView);
    parentView.getSceneMemory().forEach(memory => {
      const { scene, camera, canvas } = memory;
      const contextActions = this.getDrawPathContextAction(
        camera,
        canvas,
        scene
      );
      selectOneAction(
        [
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
              if (this.mouseCurve.length === 0) {
                super.onKeyUp(evt, parentView);
              }
              contextActions[0].action(parentView);
            }
          }
        ],
        defaultAction
      )(evt);
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
        const keyPointMeshes = pathItem.keyPoints;
        DrawPathAction.addEdgesInKeyPoints(keyPointMeshes, scene, parentView);
      })
      .undoAction(() => {
        this.deleteEdgeInKeyPoints(name, parentView);
        parentView.deleteNodeFromTreeUsingName(name);
        this.createCurve(kps, TEMP_PATH_NAME, scene, parentView, false);
        this.mouseCurve = kps;
      })
      .build();
  }

  deleteEdgeInKeyPoints(pathName, parentView) {
    parentView.getGraph().forEach(({ item: graph }) => {
      parentView.getNodeFromTree(pathName).forEach(({ item: pathItem }) => {
        const keyPointMeshes = pathItem.keyPoints;
        const edgeMeshes = [
          keyPointMeshes[0],
          keyPointMeshes[keyPointMeshes.length - 1]
        ];
        graph.delEdge(...edgeMeshes);
        parentView.updateNodeInServer(graph.name);
      });
    });
  }

  static addEdgesInKeyPoints(keyPointMeshes, scene, parentView) {
    GraphItem.createGraphItemIfNone(scene, parentView);
    parentView.getGraph().forEach(({ item: graph }) => {
      const edgeMeshes = [
        keyPointMeshes[0],
        keyPointMeshes[keyPointMeshes.length - 1]
      ];
      graph.addEdge(...edgeMeshes);
      parentView.updateNodeInServer(graph.name);
    });
  }
}

const TEMP_PATH_NAME = "temp_curve";
export default DrawPathAction;
