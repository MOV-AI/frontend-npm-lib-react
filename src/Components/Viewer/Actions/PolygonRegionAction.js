import { Maybe } from "monet";
import MouseAction from "./MouseAction";
import Vec3 from "../Math/Vec3";
import * as BABYLON from "babylonjs";
import Util3d from "../Util3d/Util3d";
import React from "react";
import PolygonRegion from "../NodeItem/PolygonRegion";

let instance = null;

const TEMP_POLYGON_REGION_NAME = "temp_polygon_region";

// Similar 2 Draw Action Path
class PolygonRegionAction extends MouseAction {
  constructor() {
    if (instance) return instance;
    super();
    this.key = "drawPolygonRegion";
    this.name = "Draw Polygon Region";
    this.mouseCurve = [];
    this.icon = props => <i className="fas fa-draw-polygon" {...props}></i>;
    instance = this;
  }

  static getInstace() {
    return new PolygonRegionAction();
  }

  createPolygonRegion = (
    region,
    name,
    scene,
    parentView,
    is2addInServer = true,
    color = BABYLON.Color3.Yellow(),
    height = 1
  ) => {
    const rootMesh = parentView.getRootNode().item.mesh;

    const localRegion = region.map(r =>
      Util3d.computeLocalCoordinateFromMesh(
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

  action = parentView => {
    super.action(parentView);
    parentView.setSelectedAction(this);
  };

  getDrawPolygonContextAction = (camera, canvas, scene) => {
    const ans = [];
    ans.push({
      icon: props => <i className="fas fa-times" {...props}></i>,
      action: parentView => {
        camera.attachControl(canvas, true);
        parentView.deleteNodeFromTreeUsingName(TEMP_POLYGON_REGION_NAME, false);
        this.mouseCurve = [];
        parentView.closeContextDial();
      },
      name: "Clear Polygon"
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
          this.createPolygonRegion(
            this.mouseCurve,
            `PolygonRegion${Math.floor(Math.random() * 1e3)}`,
            scene,
            parentView,
            true
          );
          this.mouseCurve = [];
          parentView.closeContextDial();
        },
        name: "Create Polygon"
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
        if (this.mouseCurve.length === 1) {
          this.createPolygonRegion(
            [this.mouseCurve[0], this.mouseCurve[0]],
            TEMP_POLYGON_REGION_NAME,
            scene,
            parentView,
            false
          );
        } else {
          this.createPolygonRegion(
            this.mouseCurve,
            TEMP_POLYGON_REGION_NAME,
            scene,
            parentView,
            false
          );
        }
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
}

export default PolygonRegionAction;
