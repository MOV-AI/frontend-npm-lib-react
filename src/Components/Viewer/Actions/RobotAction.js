import Robot from "../NodeItem/Robot";
import Action from "./Action";
import "babylonjs-loaders";
import MeshCache from "../Utils/MeshCache";
import { Maybe } from "monet";
import React from "react";
import PointCloud from "../NodeItem/PointCloud";
import { ACTIONS } from "../MainView/MainViewActions";

class RobotAction extends Action {
  constructor(
    robot,
    robotAnimatorFactory = (robot, parentView) =>
      Robot.getDefaultAnimator(parentView)
  ) {
    super();
    this.robot = robot;
    this.key = `robotAction${robot.name}`;
    this.name = robot.name;
    this.robotAnimatorFactory = robotAnimatorFactory;
    this.icon = props => <i className="fas fa-robot" {...props}></i>;
  }

  createRobotFromMesh(mesh, scene, parentView) {
    const meshTree = Robot.createRobotMeshTree(
      this.robot.robotTree,
      mesh,
      scene
    );

    const parentMesh = Maybe.fromNull(this.memory["parentObj"])
      .map(parentObj => parentObj.parent)
      .flatMap(parentName => parentView.getNodeFromTree(parentName))
      .map(treeNode => treeNode.item.mesh)
      .orSome(parentView.getRootNode().item.mesh);

    const dict = Maybe.fromNull(this.memory["nodeItemDict"]);
    const robot = Robot.builder()
      .id(this.robot.id)
      .name(Maybe.fromNull(this.memory["name"]).orSome(this.robot.name))
      .assetName(
        Maybe.fromNull(this.memory["assetName"]).orSome(this.robot.name)
      )
      .meshTree(meshTree)
      .parentMesh(parentMesh)
      .scene(scene)
      .keyValueMap(dict.map(x => x.keyValueMap).orSome({}))
      .build();

    robot.animate(this.robotAnimatorFactory(robot, parentView));

    // hack needed for the import
    const is2sendServer = this.memory["parentObj"] == null;
    this.memory["parentObj"] = null;
    parentView.addNodeItem2Tree(robot, parentMesh.name, is2sendServer);

    const cloudPoint = PointCloud.ofDict(
      scene,
      { name: this.robot.name, id: this.robot.id },
      parentView
    );

    cloudPoint.mesh.parent = robot.mesh;
    parentView.addNodeItem2Tree(cloudPoint, robot.name, false);
  }

  addRobot(parentView) {
    parentView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const cachedMesh = MeshCache.getInstance().get(
        Robot.ROBOT_MESH_NAME,
        scene
      );
      this.createRobotFromMesh(cachedMesh, scene, parentView);
    });
  }

  action = parentView => {
    super.action(parentView);
    parentView
      .getNodeFromTree(this.robot.name)
      .orElseRun(() => this.addRobot(parentView));
    parentView.setSelectedAction(ACTIONS.dragObjects);
  };

  getType = () => RobotAction.TYPE;

  static TYPE = "RobotAction";
}

export default RobotAction;
