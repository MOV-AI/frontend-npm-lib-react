import Util3d from "../Util3d/Util3d";
import Vec3 from "../Math/Vec3";
import { Maybe } from "monet";
import Wall from "../NodeItem/Wall";
import MouseKeysAction from "./MouseKeysAction";
import React from "react";
import { Color3 } from "@babylonjs/core";

const TEMP_WALL_NAME = "temp_wall";

class DrawWallAction extends MouseKeysAction {
  constructor() {
    super();
    this.key = "drawWall";
    this.name = "Draw wall [W]";
    this.maybeMousePos = Maybe.none();
    this.tempMesh = null;
    this.icon = props => <i className="fas fa-arrows-alt-h" {...props}></i>;
  }

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

  onPointerUp = (evt, parentView) => {
    parentView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const camera = memory.camera;
      const ground = memory.ground;
      const maybeCurrent = Util3d.getGroundPosition(scene, ground);
      maybeCurrent.forEach(current => {
        this.maybeMousePos.forEach(oldMousePos => {
          this.tempMesh.dispose();
          if (oldMousePos.subtract(current).length() > 0.1) {
            const name = `Wall${Math.floor(Math.random() * 1e3)}`;
            this.createWall(
              [oldMousePos, current],
              name,
              scene,
              parentView,
              true
            );
            parentView.setPropertiesWithName(name);
          }
        });
      });
      this.maybeMousePos = Maybe.none();
      camera.attachControl(memory.canvas, true);
      parentView.renderMenus();
    });
  };

  createWall = (
    wall,
    name,
    scene,
    parentView,
    is2addInServer = true,
    size = { width: 0.1, height: 1 },
    color = new Color3(0.25, 0.25, 0.25)
  ) => {
    const rootMesh = parentView.getRootNode().item.mesh;

    const localWall = wall.map(w =>
      Util3d.computeLocalCoordinatesFromMesh(
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
}
export default DrawWallAction;
