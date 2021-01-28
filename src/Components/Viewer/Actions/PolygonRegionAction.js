import MouseKeysAction from "./MouseKeysAction";
import Vec3 from "../Math/Vec3";
import Util3d from "../Util3d/Util3d";
import React from "react";
import PolygonRegion from "../NodeItem/PolygonRegion";
import { Color3 } from "@babylonjs/core";
import { UndoManager } from "mov-fe-lib-core";
import { selectOneAction } from "../Utils/Utils";

// Similar 2 Draw Action Path
class PolygonRegionAction extends MouseKeysAction {
  constructor() {
    super();
    this.key = "drawPolygonRegion";
    this.name = "Draw Polygon Region [5]";
    this.mouseCurve = [];
    this.icon = props => <i className="fas fa-draw-polygon" {...props}></i>;
  }

  action = parentView => {
    super.action(parentView);
    parentView.setSelectedAction(this);
  };

  onPointerDown = (evt, parentView) => {
    if (!(evt.buttons === 1)) return;
    parentView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const ground = memory.ground;
      const camera = memory.camera;
      const maybeMousePos = Util3d.getGroundPosition(scene, ground);
      maybeMousePos.forEach(mousePos => {
        camera.detachControl(memory.canvas);
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
        parentView.deleteNodeFromTreeUsingName(
          TEMP_POLYGON_REGION_NAME,
          false,
          false
        );
        this.createPolygonRegion(
          finalKps,
          TEMP_POLYGON_REGION_NAME,
          scene,
          parentView,
          false
        );
        parentView.setContextActions(
          this.getDrawPolygonContextAction(camera, canvas, scene)
        );
        this.mouseCurve = kps;
      })
      .undoAction(() => {
        parentView.deleteNodeFromTreeUsingName(TEMP_POLYGON_REGION_NAME);
        const reducedKps = kps.slice(0, kps.length - 1);
        const finalKps =
          reducedKps.length === 1 ? [reducedKps[0], reducedKps[0]] : reducedKps;
        reducedKps.length > 0 &&
          this.createPolygonRegion(
            finalKps,
            TEMP_POLYGON_REGION_NAME,
            scene,
            parentView,
            false
          );
        this.mouseCurve = reducedKps;
      })
      .build();
  }

  getDrawPolygonContextAction = (camera, canvas, scene) => {
    const ans = [];
    ans.push({
      icon: props => <i className="fas fa-trash" {...props}></i>,
      action: parentView => {
        camera.attachControl(canvas, true);
        parentView.deleteNodeFromTreeUsingName(TEMP_POLYGON_REGION_NAME, false);
        this.mouseCurve = [];
        parentView.closeContextDial();
      },
      name: "Clear Polygon [ESC | DEL | Backspace]"
    });
    if (this.mouseCurve.length > 2) {
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
        name: "Create Polygon [Enter]"
      });
    }
    return ans;
  };

  getUndoAbleEnterAction(keyPoints, scene, parentView) {
    const kps = [...keyPoints];
    const name = `PolygonRegion${Math.floor(Math.random() * 1e3)}`;
    return UndoManager.actionBuilder()
      .doAction(() => {
        parentView.deleteNodeFromTreeUsingName(TEMP_POLYGON_REGION_NAME, false);
        this.createPolygonRegion(kps, name, scene, parentView, true);
        this.mouseCurve = [];
        parentView.setPropertiesWithName(name);
        parentView.closeContextDial();
      })
      .undoAction(() => {
        parentView.deleteNodeFromTreeUsingName(name);
        this.createPolygonRegion(
          kps,
          TEMP_POLYGON_REGION_NAME,
          scene,
          parentView,
          false
        );
        this.mouseCurve = kps;
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
    // Warning: code duplication with PathAction
    const defaultAction = () => super.onKeyUp(evt, parentView);
    parentView.getSceneMemory().forEach(memory => {
      const { scene, camera, canvas } = memory;
      const contextActions = this.getDrawPolygonContextAction(
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

  createPolygonRegion = (
    region,
    name,
    scene,
    parentView,
    is2addInServer = true,
    color = Color3.Yellow(),
    height = 1
  ) => {
    const rootMesh = parentView.getRootNode().item.mesh;

    const localRegion = region.map(r =>
      Util3d.getLocalCoordFromWorld({ parent: rootMesh }, Vec3.ofBabylon(r))
    );

    const middlePoint = Util3d.pointAverageVec3(localRegion);
    const centeredRegion = localRegion.map(r => r.sub(middlePoint));

    const polygonRegionItem = PolygonRegion.ofDict(
      scene,
      {
        name: name,
        position: middlePoint.toArray(),
        color: [color.r, color.g, color.b],
        localPolygon: centeredRegion.map(x => x.toArray()),
        height: height
      },
      parentView
    );

    polygonRegionItem.mesh.parent = rootMesh;

    parentView.addNodeItem2Tree(
      polygonRegionItem,
      rootMesh.name,
      is2addInServer,
      true,
      is2addInServer
    );
  };
}

const TEMP_POLYGON_REGION_NAME = "temp_polygon_region";
export default PolygonRegionAction;
