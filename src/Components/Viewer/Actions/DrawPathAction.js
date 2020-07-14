import Util3d from "../Util3d/Util3d";
import Vec3 from "../Math/Vec3";
import Path from "../NodeItem/Path";
import MouseKeysAction from "./MouseKeysAction";
import React from "react";
import { Color3 } from "@babylonjs/core";

class DrawPathAction extends MouseKeysAction {
  constructor() {
    if (instance) return instance;
    super();
    this.key = "drawPath";
    this.name = "Draw Path [P]";
    this.mouseCurve = [];
    this.icon = props => <i className="fas fa-bezier-curve" {...props}></i>;
    instance = this;
  }

  static getInstance() {
    return new DrawPathAction();
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
        const drawPathPoints =
          this.mouseCurve.length === 1
            ? [this.mouseCurve[0], this.mouseCurve[0]]
            : this.mouseCurve;

        this.createCurve(
          drawPathPoints,
          TEMP_PATH_NAME,
          scene,
          parentView,
          false
        );
        parentView.setContextActions(
          this.getDrawPathContextAction(camera, canvas, scene)
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
    parentView.getSceneMemory().forEach(memory => {
      const { scene, camera, canvas } = memory;
      const contextActions = this.getDrawPathContextAction(
        camera,
        canvas,
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

  createCurve = (
    curve,
    name,
    scene,
    parentView,
    is2addInServer = true,
    color = Color3.Gray()
  ) => {
    const rootMesh = parentView.getRootNode().item.mesh;

    const localCurve = curve.map(w =>
      Util3d.computeLocalCoordinatesFromMesh(
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
          parentView.deleteNodeFromTreeUsingName(TEMP_PATH_NAME, false);
          const name = `Path${Math.floor(Math.random() * 1e3)}`;
          this.createCurve(this.mouseCurve, name, scene, parentView, true);
          this.mouseCurve = [];
          parentView.setPropertiesWithName(name);
          parentView.closeContextDial();
        },
        name: "Create Path [Enter]"
      });
    }
    return ans;
  };
}

let instance = null;
const TEMP_PATH_NAME = "temp_curve";
export default DrawPathAction;
