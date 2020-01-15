import * as BABYLON from "babylonjs";
import Util3d from "../Util3d/Util3d";
import Vec3 from "../Math/Vec3";
import { Maybe } from "monet";
import Wall from "../NodeItem/Wall";
import MouseAction from "./MouseAction";
import React from "react";

let instance = null;

const TEMP_WALL_NAME = "temp_wall";

class DrawWallAction extends MouseAction {
  constructor() {
    if (instance) return instance;
    super();
    this.key = "drawWall";
    this.name = "Draw wall";
    this.maybeMousePos = Maybe.none();
    this.tempMesh = null;
    this.icon = props => <i className="fas fa-arrows-alt-h" {...props}></i>;
    instance = this;
  }

  static getInstace() {
    return new DrawWallAction();
  }

  createWall = (
    wall,
    name,
    scene,
    parentView,
    is2addInServer = true,
    size = { width: 0.1, height: 1 },
    color = new BABYLON.Color3(0.25, 0.25, 0.25)
  ) => {
    const rootMesh = parentView.getRootNode().item.mesh;

    const localWall = wall.map(w =>
      Util3d.computeLocalCoordinateFromMesh(
        { parent: rootMesh },
        Vec3.ofBabylon(w)
      ).toBabylon()
    );

    const middlePoint = localWall[1].add(localWall[0]).scale(0.5);
    const centeredWall = localWall.map(w => w.subtract(middlePoint));

    const wallItem = Wall.ofDict(
      scene,
      {
        name: name,
        position: Vec3.ofBabylon(middlePoint).toArray(),
        size: size,
        color: [color.r, color.g, color.b],
        localWall: centeredWall.map(x => Vec3.ofBabylon(x).toArray())
      },
      parentView
    );
    wallItem.mesh.parent = rootMesh;
    if (is2addInServer) {
      parentView.addNodeItem2Tree(wallItem, rootMesh.name, is2addInServer);
    }
    return wallItem.mesh;
  };

  action = parentView => {
    super.action(parentView);
    parentView.setSelectedAction(this);
  };

  onPointerDown = (evt, parentView) => {
    if (evt.button !== 0) {
      return;
    }
    parentView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const ground = memory.ground;
      const camera = memory.camera;
      const maybeMousePos = Util3d.getGroundPosition(scene, ground);
      this.maybeMousePos = maybeMousePos;
      maybeMousePos.forEach(mousePos => {
        camera.detachControl(memory.canvas);
      });
    });
  };

  onPointerMove = (evt, parentView) => {
    parentView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const ground = memory.ground;
      const maybeCurrent = Util3d.getGroundPosition(scene, ground);
      maybeCurrent.forEach(current => {
        this.maybeMousePos.forEach(oldMousePos => {
          if (this.tempMesh) this.tempMesh.dispose();
          this.tempMesh = this.createWall(
            [oldMousePos, current],
            TEMP_WALL_NAME,
            scene,
            parentView,
            false
          );
        });
      });
    });
  };

  onPointerUp = parentView => {
    parentView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const camera = memory.camera;
      const ground = memory.ground;
      const maybeCurrent = Util3d.getGroundPosition(scene, ground);
      maybeCurrent.forEach(current => {
        this.maybeMousePos.forEach(oldMousePos => {
          this.tempMesh.dispose();
          if (oldMousePos.subtract(current).length() > 0.1) {
            this.createWall(
              [oldMousePos, current],
              `Wall${Math.floor(Math.random() * 1e3)}`,
              scene,
              parentView,
              true
            );
          }
        });
      });
      this.maybeMousePos = Maybe.none();
      camera.attachControl(memory.canvas, true);
    });
  };
}
export default DrawWallAction;
