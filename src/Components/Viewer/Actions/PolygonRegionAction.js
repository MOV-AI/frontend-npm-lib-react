import MouseKeysAction from "./MouseKeysAction";
import Vec3 from "../Math/Vec3";
import Util3d from "../Util3d/Util3d";
import React from "react";
import PolygonRegion from "../NodeItem/PolygonRegion";
import { Color3 } from "@babylonjs/core";

let instance = null;

const TEMP_POLYGON_REGION_NAME = "temp_polygon_region";

// Similar 2 Draw Action Path
class PolygonRegionAction extends MouseKeysAction {
  constructor() {
    if (instance) return instance;
    super();
    this.key = "drawPolygonRegion";
    this.name = "Draw Polygon Region [R]";
    this.mouseCurve = [];
    this.icon = props => <i className="fas fa-draw-polygon" {...props}></i>;
    instance = this;
  }

  static getInstance() {
    return new PolygonRegionAction();
  }

  action = parentView => {
    super.action(parentView);
    parentView.setSelectedAction(this);
  };

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
          parentView.deleteNodeFromTreeUsingName(
            TEMP_POLYGON_REGION_NAME,
            false
          );
          const name = `PolygonRegion${Math.floor(Math.random() * 1e3)}`;
          this.createPolygonRegion(
            this.mouseCurve,
            name,
            scene,
            parentView,
            true
          );
          this.mouseCurve = [];
          parentView.setPropertiesWithName(name);
          parentView.closeContextDial();
        },
        name: "Create Polygon [Enter]"
      });
    }
    return ans;
  };

  onPointerDown = (evt, parentView) => {
    parentView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const ground = memory.ground;
      const camera = memory.camera;
      const maybeMousePos = Util3d.getGroundPosition(scene, ground);
      maybeMousePos.forEach(mousePos => {
        camera.detachControl(memory.canvas);
        this.mouseCurve.push(mousePos);
        const drawPolyPoints =
          this.mouseCurve.length === 1
            ? [this.mouseCurve[0], this.mouseCurve[0]]
            : this.mouseCurve;
        this.createPolygonRegion(
          drawPolyPoints,
          TEMP_POLYGON_REGION_NAME,
          scene,
          parentView,
          false
        );
        parentView.setContextActions(
          this.getDrawPolygonContextAction(camera, memory.canvas, scene)
        );
      });
    });
  };

  onPointerMove = (evt, parentView) => {
    // empty
  };

  onPointerUp = parentView => {
    // empty
  };

  onKeyDown = (evt, parentView) => {
    // Warning: code duplication with PathAction
    parentView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const camera = memory.camera;
      const contextActions = this.getDrawPolygonContextAction(
        camera,
        memory.canvas,
        scene
      );
      const keyCodeActionMap = {
        Enter: () => contextActions[1].action(parentView),
        Delete: () => contextActions[0].action(parentView),
        Backspace: () => contextActions[0].action(parentView),
        Escape: () => {
          if (this.mouseCurve.length === 0) {
            super.onKeyDown(evt, parentView);
          }
          contextActions[0].action(parentView);
        }
      };
      if (evt.code in keyCodeActionMap) {
        keyCodeActionMap[evt.code]();
      } else {
        super.onKeyDown(evt, parentView);
      }
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
      Util3d.computeLocalCoordinatesFromMesh(
        { parent: rootMesh },
        Vec3.ofBabylon(r)
      )
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
      is2addInServer
    );
  };
}

export default PolygonRegionAction;
