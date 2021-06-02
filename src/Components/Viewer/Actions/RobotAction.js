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

  action = (parentView, errorCallback = () => {}) => {
    super.action(parentView);
    // If robot doesn't exists: Add robot
    parentView
      .getNodeFromTree(this.robot.name)
      .orElseRun(() => this.addRobot(parentView, errorCallback));
    // If robot already exist in node tree : Update robot if mesh is different
    parentView.getNodeFromTree(this.robot.name).forEach(({ item }) => {
      if (!item.mesh.id.includes(this.robot.meshName)) {
        parentView.deleteNodeFromTreeUsingName(this.name, true, true);
        this.addRobot(parentView, errorCallback);
      }
    });
    parentView.setSelectedAction(ACTIONS().dragObjects);
  };

  addRobot(parentView, errorCallback = () => {}) {
    parentView.getSceneMemory().forEach(memory => {
      const { scene } = memory;
      const actionMemoryClone = { ...this.memory };
      const isImport = actionMemoryClone["isImport"];
      if (isImport)
        this.loadRobot(scene, parentView, actionMemoryClone, errorCallback);
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
      .undoAction(({ is2UpdateInServer = true }) => {
        parentView.deleteNodeFromTreeUsingName(this.name, is2UpdateInServer);
      })
      .build();
  }

  loadRobot(scene, parentView, actionMemoryClone, errorCallback = () => {}) {
    MeshLoader.of(scene)
      .load(this.robot.meshName)
      .then(mesh =>
        this.createRobotFromMesh(mesh, scene, parentView, actionMemoryClone)
      )
      .catch(err => errorCallback(err));
  }

  createRobotFromMesh(mesh, scene, parentView, memory) {
    const parentMesh = this.getParentMesh(parentView);
    const isImport = Maybe.fromNull(memory.isImport).orSome(false);
    const isVisible = Maybe.fromNull(memory.isVisible).orSome(true);
    mesh.setEnabled(isVisible);

    const robot = this.getRobot(scene, mesh, parentMesh, parentView);
    robot.animate(this.robotAnimatorFactory(robot, parentView));
    parentView.addNodeItem2Tree(robot, parentMesh.name, !isImport, isVisible);

    const cloudPoint = this.getCloudPoint(scene, parentView, robot);
    parentView.addNodeItem2Tree(cloudPoint, robot.name, false, isVisible);
  }

  getRobot = (scene, mesh, parentMesh, parentView) => {
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
      .parentView(parentView)
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
