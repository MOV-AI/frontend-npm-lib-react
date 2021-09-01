import React, { Component } from "react";
import BaseViewer from "./BaseViewer/BaseViewer";
import PropTypes from "prop-types";
import { HighlightLayer, Vector3 } from "@babylonjs/core";
import { Maybe } from "monet";
import MainViewRetriever from "./MainView/MainViewRetriever";
import DefaultScene from "./Utils/DefaultScene";
import GlobalRef from "./NodeItem/GlobalRef";
import SceneServerUtils from "./Utils/SceneServerUtils";
import TreeServerUtils from "./Utils/TreeServerUtils";
import AssetsManager from "./AssetsManager/AssetsManager";
import TreeObject from "./TreeObject/TreeObject";
import GraphItem from "./NodeItem/GraphItem";
import DefaultMouseEvents from "./Utils/DefaultMouseEvents";
import Util3d from "./Util3d/Util3d";
import Vec3 from "./Math/Vec3";
import ReactResizeDetector from "react-resize-detector";
import ConfirmAlertModal from "../Modal/ConfirmAlertModal";
import RobotLogModal from "../Modal/RobotLogModal";
import MeshCache from "./Utils/MeshCache";
import Robot from "./NodeItem/Robot";
import { UndoManager, RobotManager } from "@mov-ai/mov-fe-lib-core";

//========================================================================================
/*                                                                                      *
 *                                      SceneViewer                                     *
 *                                                                                      */
//========================================================================================

class SceneViewer extends Component {
  constructor(props) {
    super(props);
    this.state = { errorList: [] };
    this.sceneName = props.sceneName.Value;
    this.sceneMemory = Maybe.none();
    this.objectTree = [];
    this.undoManager = new UndoManager();
    // camera properties
    this.isPanned = false;
    this.isRotated = false;
    this.targetPos = undefined;
    this.cameraSpeed = Vector3.Zero();
    this.time = new Date().getTime() * 1e-3;
    this.robotManager = new RobotManager();
    this.robotAlertModal = React.createRef();
  }

  //========================================================================================
  /*                                                                                      *
   *                                   Getters & Setters                                  *
   *                                                                                      */
  //========================================================================================

  getRobotManager = () => this.robotManager;

  getSceneMemory = () => this.sceneMemory;

  getAssetsActionMap = () => AssetsManager.getInstance().getAssetsActionMap();

  getRootNode = (tree = [...this.objectTree]) => {
    return tree.filter(x => x.title === GlobalRef.NAME)[0];
  };

  getObjectTree = () => this.objectTree;

  setSelectedAction = () => {
    /* empty */
  };

  getGraph() {
    return new TreeObject(this.objectTree).getNode(
      x => GraphItem.TYPE === x.item.getType()
    );
  }

  getRobots() {
    return this.getRootNode()
      .children.filter(x => x.item.getType() === Robot.TYPE)
      .map(el => el.item);
  }

  getUndoManager = () => this.undoManager;

  //========================================================================================
  /*                                                                                      *
   *                                    Utils functions                                   *
   *                                                                                      */
  //========================================================================================

  getNodeFromTree = (name, objectTree = [...this.objectTree]) => {
    return TreeServerUtils.ofScene(
      this.sceneName,
      this.undoManager
    ).getNodeFromTree(name, objectTree);
  };

  deleteNodeFromTreeUsingName = () => {
    throw new Error("Delete Node in viewer Exception");
  };

  updateNodeInServer = (name, oldName = null) => {
    TreeServerUtils.ofScene(
      this.sceneName,
      this.undoManager
    ).updateNodeInServer(name, [...this.objectTree], oldName);
  };

  addNodeItem2Tree = (
    nodeItem,
    parentName = GlobalRef.NAME,
    is2addInServer = true,
    isVisible = true
  ) => {
    const newObjectTree = TreeServerUtils.ofScene(
      this.sceneName,
      this.undoManager
    ).addNodeItem2Tree(
      [...this.objectTree],
      nodeItem,
      parentName,
      is2addInServer,
      isVisible
    );
    this.objectTree = newObjectTree;
  };

  setCameraToTarget = () => {
    this.sceneMemory.forEach(({ camera }) => {
      const focusObject = this.isPanned ? "" : this.props.focusObject.Value;
      this.getNodeFromTree(focusObject).forEach(x => {
        console.log("Set Camera, Found Object", x.item.mesh);
        const dt = new Date().getTime() * 1e-3 - this.time;
        this.time = new Date().getTime() * 1e-3;
        const pos = x.item.mesh._absolutePosition.clone();
        this.cameraSpeed = !this.targetPos
          ? Vector3.Zero()
          : pos.subtract(this.targetPos);
        this.targetPos = pos;
        camera.setTarget(pos);
        camera.position = camera.position.add(this.cameraSpeed.scale(dt));
        camera.beta = this.isRotated ? camera.beta : 0;
        // move target object for debug
        // const p = x.item.mesh.position;
        // x.item.mesh.position = p.add(new Vector3(p.x, p.y, 0).scale(1e-2));
      });
    });
  };

  addCanvasEventListeners(canvas) {
    const events = [
      {
        name: "pointerdown",
        function: evt => this.onPointerDown(evt)
      },
      { name: "pointerup", function: evt => this.onPointerUp(evt) },
      {
        name: "pointermove",
        function: evt => this.onPointerMove(evt)
      }
    ];
    events.forEach(event =>
      canvas.addEventListener(event.name, event.function, false)
    );
  }

  onPointerDown = evt => {
    this.isRotated = true;
    DefaultMouseEvents.onPointerDown(this)(evt);
  };

  onPointerUp = evt => {
    DefaultMouseEvents.onPointerUp(this)(evt);
  };

  onPointerMove = evt => {
    if (evt.buttons === 4) this.isPanned = true;
    DefaultMouseEvents.onPointerMove(this)(evt);
  };

  getMouseCoordsFromRoot() {
    // TODO: code repetition in mainView
    return this.sceneMemory.flatMap(({ scene, ground }) => {
      const maybeCurrent = Util3d.getGroundPosition(scene, ground);
      return maybeCurrent.flatMap(current =>
        Maybe.fromNull(this.getRootNode()).map(rootNode =>
          Util3d.getLocalCoordFromWorld(
            rootNode.item.mesh,
            Vec3.ofBabylon(current)
          ).toBabylon()
        )
      );
    });
  }

  onResize = (w, h) => {
    if (w === 0 && h === 0) return;
    this.getSceneMemory().forEach(({ mouseLocationText }) => {
      mouseLocationText.left = -w / 2 + w / 17;
      mouseLocationText.top = -h / 2 + h / 30;
    });
  };

  //========================================================================================
  /*                                                                                      *
   *                                    Scene functions                                   *
   *                                                                                      */
  //========================================================================================

  retrieveSceneFromServer = (afterLoading = () => {}) => {
    SceneServerUtils.retrieveScene(this.sceneName, data => {
      const errorList = MainViewRetriever.importScene(this, data.result);
      this.resizeGround();
      this.setState({ errorList });
      afterLoading();
    });
  };

  loadAssets = async () => {
    const assetManager = AssetsManager.getInstance();
    if (Object.values(assetManager.getAssets()).length === 0) {
      await assetManager.load();
    }
  };

  loadScene = async () => {
    await this.loadAssets();
    this.retrieveSceneFromServer(this.renderScene);
  };

  renderScene = () => {
    this.getSceneMemory().forEach(({ engine, scene }) =>
      engine.runRenderLoop(() => {
        this.time = new Date().getTime() * 1e-3;
        scene.render();
        this.setCameraToTarget();
      })
    );
  };

  onSceneReady = scene => {
    const engine = scene.getEngine();
    const canvas = engine.getRenderingCanvas();
    this.addCanvasEventListeners(canvas);
    const mouseLocationText = DefaultScene.createMouseLocationText(scene);
    this.sceneMemory = Maybe.some({
      engine: engine,
      canvas: canvas,
      scene: scene,
      camera: DefaultScene.createCamera(scene, canvas),
      light: DefaultScene.createLight(scene),
      ground: DefaultScene.createMeshGround(scene),
      gizmoManager: DefaultScene.createGizmo(scene),
      highlightLayer: {
        layer: new HighlightLayer("hl1", scene),
        lastHlMeshes: []
      },
      mouseLocationText: mouseLocationText
    });
    return scene;
  };

  resizeGround(defaultSize = 30) {
    this.getSceneMemory().forEach(memory => {
      memory.ground.dispose();
      const scene = memory.scene;
      const { max, min } = scene.getWorldExtends();
      let diff = max.subtract(min);
      let is2Small = false;
      if (diff.length() < defaultSize) {
        diff = new Vector3(defaultSize, 0, defaultSize);
        is2Small = true;
      }
      memory.ground = DefaultScene.createMeshGround(scene, diff.x, diff.z);
      memory.ground.position = new Vector3(
        min.x + (is2Small ? 0 : diff.x / 2),
        memory.ground.position.y,
        min.z + (is2Small ? 0 : diff.z / 2)
      );
    });
  }

  showRobotAlertModal = alert => {
    this.robotAlertModal.current.open(alert);
  };

  showAlert = (message, type) => {
    alert(`type:${type} ` + message);
  };

  //========================================================================================
  /*                                                                                      *
   *                                   Render functions                                   *
   *                                                                                      */
  //========================================================================================

  renderMenus = () => {
    // to implement interface of MainView
  };

  componentDidUpdate = prevProps => {
    const predicateAction = [
      {
        propVar: x => x.sceneName.Value,
        action: () => (this.sceneName = this.props.sceneName.Value)
      },
      {
        propVar: x => x.focusObject.Value,
        action: () => {
          this.isPanned = false;
          this.isRotated = false;
          this.setCameraToTarget();
        }
      }
    ];
    predicateAction.forEach(({ propVar, action }) => {
      if (propVar(this.props) !== propVar(prevProps)) {
        action();
      }
    });
  };

  componentDidMount = () => {
    console.log("SceneViewer Did Mount!! ");
    this.loadScene();
  };

  componentWillUnmount() {
    this.sceneMemory.forEach(({ scene }) => {
      // Unsubscribe robots from robot logger
      this.getRobots().forEach(nodeItem => {
        nodeItem.dispose();
        if (nodeItem.loggerSubscription)
          nodeItem.robot.unsubscribeToLogs(nodeItem.loggerSubscription);
      });
      // Clear observers and clean scene objects
      AssetsManager.getInstance().clearObserver(scene);
      MeshCache.getInstance().del(scene);
      delete this.objectTree;
      delete this.sceneMemory;
      delete this.undoManager;
    });
  }

  render() {
    const { errorList } = this.state;
    const resetErrorList = () => this.setState({ errorList: [] });
    return (
      <div style={{ display: "flex", flexGrow: 1, maxHeight: "100%" }}>
        <BaseViewer
          onSceneReady={this.onSceneReady}
          is2render={false}
          sceneFactory={DefaultScene.createScene}
        />
        <ConfirmAlertModal
          onSubmit={resetErrorList}
          onCancel={resetErrorList}
          open={errorList?.length > 0}
          title={"Scene Viewer"}
          message={"An error occurred while loading the scene"}
          submitText={"OK"}
          submitColor={"primary"}
          cancelText={"Cancel"}
          cancelColor={"secondary"}
        >
          {getErrorSolutionList(errorList)}
        </ConfirmAlertModal>
        <RobotLogModal ref={this.robotAlertModal} title="Alert" />
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.onResize}
        />
      </div>
    );
  }

  //========================================================================================
  /*                                                                                      *
   *                                   Static functions                                   *
   *                                                                                      */
  //========================================================================================

  static getComponentFactory(sceneName) {
    return masterProps => {
      const augmentProps = {
        sceneName,
        ...masterProps
      };
      return <SceneViewer {...augmentProps} />;
    };
  }

  static EXTENSION = ".3d";
}

SceneViewer.propTypes = {
  sceneName: PropTypes.shape({ Value: PropTypes.string }),
  focusObject: PropTypes.shape({ Value: PropTypes.string })
};

SceneViewer.defaultProps = {
  sceneName: { Value: "Pedro" },
  focusObject: { Value: "" }
};

function getErrorSolutionList(errorList) {
  return !errorList ? (
    []
  ) : (
    <ul>
      {errorList.map(({ cause, solution }, i) => {
        return <li key={"error" + i}>{`${cause}, ${solution}`}</li>;
      })}
    </ul>
  );
}

export default SceneViewer;
