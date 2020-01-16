import Util3d from "../Util3d/Util3d";
import * as BABYLON from "babylonjs";
import Vec3 from "../Math/Vec3";
import Path from "../NodeItem/Path";
import MouseAction from "./MouseAction";
import React from "react";

let instance = null;

const TEMP_PATH_NAME = "temp_curve";

class DrawPathAction extends MouseAction {
  constructor() {
    if (instance) return instance;
    super();
    this.key = "drawPath";
    this.name = "Draw Path";
    this.mouseCurve = [];
    this.icon = props => <i className="fas fa-bezier-curve" {...props}></i>;
    instance = this;
  }

  static getInstace() {
    return new DrawPathAction();
  }

  createCurve = (
    curve,
    name,
    scene,
    parentView,
    is2addInServer = true,
    color = BABYLON.Color3.White()
  ) => {
    const rootMesh = parentView.getRootNode().item.mesh;

    const localCurve = curve.map(w =>
      Util3d.computeLocalCoordinateFromMesh(
        { parent: rootMesh },
        Vec3.ofBabylon(w)
      ).toBabylon()
    );
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
    parentView.addNodeItem2Tree(pathItem, rootMesh.name, is2addInServer);
  };

  action = parentView => {
    super.action(parentView);
    parentView.setSelectedAction(this);
  };

  getDrawPathContextAction = (camera, canvas, scene) => {
    const ans = [];
    ans.push({
      icon: props => <i className="fas fa-times" {...props}></i>,
      action: parentView => {
        camera.attachControl(canvas, true);
        parentView.deleteNodeFromTreeUsingName(TEMP_PATH_NAME, false);
        this.mouseCurve = [];
        parentView.closeContextDial();
      },
      name: "Clear Path"
    });
    if (this.mouseCurve.length > 1) {
      ans.push({
        icon: props => <i className="fas fa-check" {...props}></i>,
        action: parentView => {
          camera.attachControl(canvas, true);
          parentView.deleteNodeFromTreeUsingName(TEMP_PATH_NAME, false);
          this.createCurve(
            this.mouseCurve,
            `Path${Math.floor(Math.random() * 1e3)}`,
            scene,
            parentView,
            true
          );
          this.mouseCurve = [];
          parentView.closeContextDial();
        },
        name: "Create Path"
      });
    }
    return ans;
  };

  onPointerDown = (evt, parentView) => {
    if(!(evt.buttons === 1)) return;
    parentView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const ground = memory.ground;
      const camera = memory.camera;
      const maybeMousePos = Util3d.getGroundPosition(scene, ground);
      maybeMousePos.forEach(mousePos => {
        camera.detachControl(memory.canvas);
        this.mouseCurve.push(mousePos);
        if (this.mouseCurve.length === 1) {
          this.createCurve(
            [this.mouseCurve[0], this.mouseCurve[0]],
            TEMP_PATH_NAME,
            scene,
            parentView,
            false
          );
        } else {
          this.createCurve(
            this.mouseCurve,
            TEMP_PATH_NAME,
            scene,
            parentView,
            false
          );
        }
        parentView.setContextActions(
          this.getDrawPathContextAction(camera, memory.canvas, scene)
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

export default DrawPathAction;
