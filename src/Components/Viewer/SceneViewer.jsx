import React, { Component } from "react";
import BaseViewer from "./BaseViewer/BaseViewer";
import PropTypes from "prop-types";
import { HighlightLayer, Vector3 } from "babylonjs";
import { Maybe } from "monet";
import Robot from "./NodeItem/Robot";
import MeshCache from "./Utils/MeshCache";
import MainViewRetriever from "./MainView/MainViewRetriever";
import DefaultScene from "./Utils/DefaultScene";
import GlobalRef from "./NodeItem/GlobalRef";
import SceneServerUtils from "./Utils/SceneServerUtils";
import MeshLoader from "./Utils/MeshLoader";
import TreeServerUtils from "./Utils/TreeServerUtils";
import AssetsManager from "./AssetsManager/AssetsManager";

//========================================================================================
/*                                                                                      *
 *                                      SceneViewer                                     *
 *                                                                                      */
//========================================================================================

class SceneViewer extends Component {
    constructor(props) {
        super(props);
        this.sceneName = props.sceneName.Value;
        this.sceneMemory = Maybe.none();
        this.objectTree = [];
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

    setSelectedAction = action => {
        /* empty */
    };

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

    deleteNodeFromTreeUsingName = (name, is2delInServer = true) => {
        throw "Delete Node in viewer Exception";
    };

    updateNodeInServer = (name, oldName = null) => {
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

    //========================================================================================
    /*                                                                                      *
     *                                    Scene functions                                   *
     *                                                                                      */
    //========================================================================================

    retrieveSceneFromServer = () => {
        SceneServerUtils.retrieveScene(this.sceneName, data =>
            MainViewRetriever.importScene(this, data.result)
        );
    };

    getAssets = afterLoading => {
        const assetManager = AssetsManager.getInstance();
        assetManager.addAfterLoad(afterLoading);
        // In the case the assets are already loaded
        if (Object.values(assetManager.getAssets()).length > 0) {
            afterLoading();
        }
    };

    loadMeshes = (afterLoading = () => { }) => {
        //TODO: refactor this code, is equal to MainView
        this.getSceneMemory().forEach(memory => {
            const engine = memory.engine;
            const scene = memory.scene;
            MeshLoader.of(scene).loadMeshes(
                Robot.ROBOT_MESH_NAME,
                task => {
                    const mesh = Robot.transformMesh(task.loadedMeshes[0], scene);
                    MeshCache.getInstance().put(Robot.ROBOT_MESH_NAME, scene, mesh);
                },
                tasks => {
                    engine.runRenderLoop(() => scene.render());
                    afterLoading();
                }
            );
        });
    };

    loadScene = () => {
        this.loadMeshes(() => this.getAssets(() => this.retrieveSceneFromServer()));
    };

    cameraViewObservable = camera => {
        const isLookingDown = Math.abs(camera.beta) <= 0.01;
        if (isLookingDown) camera.panningAxis = new Vector3(1, 1, 0);
        else camera.panningAxis = new Vector3(1, 0, 1);
    };

    createScene = (engine, canvas) => {
        const scene = DefaultScene.createScene(engine);

        this.sceneMemory = Maybe.some({
            engine: engine,
            canvas: canvas,
            scene: scene,
            camera: DefaultScene.createCamera(scene, canvas, camera =>
                camera.onViewMatrixChangedObservable.add(() =>
                    this.cameraViewObservable(camera)
                )
            ),
            light: DefaultScene.createLight(scene),
            ground: DefaultScene.createMeshGround(scene),
            gizmoManager: DefaultScene.createGizmo(scene),
            highlightLayer: {
                hl: new HighlightLayer("hl1", scene),
                lastHlMesh: null
            }
        });

        return scene;
    };

    //========================================================================================
    /*                                                                                      *
     *                                   Render functions                                   *
     *                                                                                      */
    //========================================================================================


    componentDidUpdate = prevProps => {
        if (this.props.sceneName.Value !== prevProps.sceneName.Value) {
            this.sceneName = this.props.sceneName.Value;
        }
    };

    componentDidMount = () => {
        console.log("SceneViewer Did Mount!!");
        this.loadScene();
    };

    render() {
        return <BaseViewer createScene={this.createScene} is2render={false} />;
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
    sceneName: PropTypes.shape({ Value: PropTypes.string })
};

SceneViewer.defaultProps = {
    sceneName: { Value: "Pedro" }
};

export default SceneViewer;
