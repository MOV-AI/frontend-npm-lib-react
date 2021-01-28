import Robot from "../NodeItem/Robot";
import Action from "./Action";
import { Maybe } from "monet";
import React from "react";
import PointCloud from "../NodeItem/PointCloud";
import { ACTIONS } from "../MainView/MainViewActions";
import MeshLoader from "../Utils/MeshLoader";
import { UndoManager } from "mov-fe-lib-core";

class RobotAction extends Action {
  constructor(
    robot,
    robotAnimatorFactory = (robot, parentView) =>
      Robot.getDefaultAnimator(parentView)
  ) {
    super();
    this.key = `robotAction${robot.name}`;
    this.name = robot.name;
    this.robot = robot;
    this.robotAnimatorFactory = robotAnimatorFactory;
    this.icon = props => <i className="fas fa-robot" {...props}></i>;
  }

  action = parentView => {
    super.action(parentView);
    // if robot already exists, do nothing
    parentView
      .getNodeFromTree(this.robot.name)
      .orElseRun(() => this.addRobot(parentView));
    parentView.setSelectedAction(ACTIONS().dragObjects);
  };

  addRobot(parentView) {
    parentView.getSceneMemory().forEach(memory => {
      const { scene } = memory;
      const actionMemoryClone = { ...this.memory };
      const isImport = actionMemoryClone["isImport"];
      if (isImport) this.loadRobot(scene, parentView, actionMemoryClone);
      else {
        parentView
          .getUndoManager()
          .doIt(this.getUndoAbleAction(parentView, scene, actionMemoryClone));
      }
    });
    this.memory["isImport"] = false;
  }

  getUndoAbleAction(parentView, scene, actionMemoryClone) {
    return UndoManager.actionBuilder()
      .doAction(() => {
        this.loadRobot(scene, parentView, actionMemoryClone);
      })
      .undoAction(() => {
        parentView.deleteNodeFromTreeUsingName(this.name);
      })
      .build();
  }

  loadRobot(scene, parentView, actionMemoryClone) {
    MeshLoader.of(scene)
      .load(Robot.ROBOT_MESH_NAME, mesh => Robot.transformMesh(mesh, scene))
      .then(mesh =>
        this.createRobotFromMesh(mesh, scene, parentView, actionMemoryClone)
      );
  }

  createRobotFromMesh(mesh, scene, parentView, memory) {
    const parentMesh = this.getParentMesh(parentView);
    const isImport = Maybe.fromNull(memory.isImport).orSome(false);
    const isVisible = Maybe.fromNull(memory.isVisible).orSome(true);
    mesh.setEnabled(isVisible);

    const robot = this.getRobot(scene, mesh, parentMesh);
    robot.animate(this.robotAnimatorFactory(robot, parentView));
    parentView.addNodeItem2Tree(robot, parentMesh.name, !isImport, isVisible);

    const cloudPoint = this.getCloudPoint(scene, parentView, robot);
    parentView.addNodeItem2Tree(cloudPoint, robot.name, false, isVisible);
  }

  getRobot = (scene, mesh, parentMesh) => {
    const meshTree = Robot.createRobotMeshTree(
      this.robot.robotTree,
      mesh,
      scene
    );
    const dict = Maybe.fromNull(this.memory["nodeItemDict"]);
    return Robot.builder()
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
  };

  getCloudPoint = (scene, parentView, robot) => {
    const cloudPoint = PointCloud.ofDict(
      scene,
      { name: this.robot.name, id: this.robot.id },
      parentView
    );
    cloudPoint.mesh.parent = robot.mesh;
    return cloudPoint;
  };

  getParentMesh = parentView => {
    return Maybe.fromNull(this.memory["parentObj"])
      .map(parentObj => parentObj.parent)
      .flatMap(parentName => parentView.getNodeFromTree(parentName))
      .map(treeNode => treeNode.item.mesh)
      .orSome(parentView.getRootNode().item.mesh);
  };

  getType = () => RobotAction.TYPE;

  static TYPE = "RobotAction";
}

export default RobotAction;
