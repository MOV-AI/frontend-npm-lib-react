import React, { Component } from "react";
import BaseViewer from "./BaseViewer/BaseViewer";
import PropTypes from "prop-types";
import { HighlightLayer } from "@babylonjs/core";
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
import { ConfirmAlertModal } from "mov-fe-lib-react";
import { UndoManager } from "mov-fe-lib-core";

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
  }

  //========================================================================================
  /*                                                                                      *
   *                                   Getters & Setters                                  *
   *                                                                                      */
  //========================================================================================

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

  getUndoManager = () => this.undoManager;

  //========================================================================================
  /*                                                                                      *
   *                                    Utils functions                                   *
   *                                                                                      */
  //========================================================================================

  getNodeFromTree = (name, objectTree = [...this.objectTree]) => {
    return TreeServerUtils.ofScene(this.sceneName).getNodeFromTree(
      name,
      objectTree
    );
  };

  deleteNodeFromTreeUsingName = () => {
    throw new Error("Delete Node in viewer Exception");
  };

  updateNodeInServer = (name, oldName = null) => {
    if (this.props.focusObject.Value === name) this.setCameraToTarget();
    TreeServerUtils.ofScene(this.sceneName).updateNodeInServer(
      name,
      [...this.objectTree],
      oldName
    );
  };

  addNodeItem2Tree = (
    nodeItem,
    parentName = GlobalRef.NAME,
    is2addInServer = true,
    isVisible = true
  ) => {
    const newObjectTree = TreeServerUtils.ofScene(
      this.sceneName
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
      const focusObject = this.props.focusObject.Value;
      this.getNodeFromTree(focusObject).cata(
        () => {
          console.log(
            "Set Camera",
            this.getRootNode().item.mesh._absolutePosition
          );
          camera.setTarget(
            this.getRootNode().item.mesh._absolutePosition.clone()
          );
        },
        x => {
          console.log("Set Camera, Found Object", x.item.mesh);
          camera.setTarget(x.item.mesh._absolutePosition.clone());
        }
      );
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
    DefaultMouseEvents.onPointerDown(this)(evt);
  };

  onPointerUp = evt => {
    DefaultMouseEvents.onPointerUp(this)(evt);
  };

  onPointerMove = evt => {
    DefaultMouseEvents.onPointerMove(this)(evt);
  };

  getMouseCoordsFromRoot() {
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
      engine.runRenderLoop(() => scene.render())
    );
    this.setCameraToTarget();
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
        action: this.setCameraToTarget
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

  render() {
    const { errorList } = this.state;
    const resetErrorList = () => this.setState({ errorList: [] });
    return (
      <div style={{ display: "flex", flexGrow: 1 }}>
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
