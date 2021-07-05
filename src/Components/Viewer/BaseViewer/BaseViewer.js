//========================================================================================
/*                                                                                      *
 *         Based from https://doc.babylonjs.com/resources/babylonjs_and_reactjs         *
 *                                                                                      */
//========================================================================================

import { Engine, Scene } from "@babylonjs/core";
import React, { useEffect, useRef, useState } from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import ReactResizeDetector from "react-resize-detector";
import PropTypes from "prop-types";
import { SCENE_BACKGROUND } from "../Utils/Constants";

const useStyles = makeStyles(theme => {
  return {
    root: {}
  };
});
const FLEX_STYLE = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1
};

const BaseViewer = props => {
  const {
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    is2render,
    sceneFactory,
    ...rest
  } = props;
  const theme = useTheme();
  const classes = useStyles();
  const reactCanvas = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [scene, setScene] = useState(null);
  const [size, setSize] = useState({ width: 100, height: 100 });

  const setUpScene = engine => {
    const scene = sceneFactory
      ? sceneFactory(engine)
      : new Scene(engine, sceneOptions);
    setScene(scene);
    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce(scene => onSceneReady(scene));
    }
    return scene;
  };

  const onResize = (width, height) => {
    setSize({
      width,
      height
    });
    scene && scene.getEngine().resize();
  };

  const renderScene = (engine, nScene) => {
    if (!is2render) return;
    engine.runRenderLoop(() => {
      if (typeof onRender === "function") {
        onRender(nScene);
      }
      nScene && nScene.render();
    });
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      const engine = new Engine(
        reactCanvas.current,
        antialias,
        engineOptions,
        adaptToDeviceRatio
      );
      // const engine = new EngineSingleton(reactCanvas.current).engine;
      const newScene = setUpScene(engine);
      renderScene(engine, newScene);
    }

    return () => {
      console.log("Disposing engine and scene");
      scene && scene.dispose();
      scene && scene.getEngine() && scene.getEngine().dispose();
    };
  }, [reactCanvas, loaded, scene]);
  /* eslint-enable react-hooks/exhaustive-deps */
  // loaded && reactCanvas.current.focus();

  // On toggle theme update scene background color
  useEffect(() => {
    if (!scene) return;
    scene.clearColor = SCENE_BACKGROUND[theme?.label || "default"];
  }, [classes, theme.label, scene]);

  return (
    <div style={{ ...FLEX_STYLE, maxHeight: "100%" }}>
      <canvas
        ref={reactCanvas}
        width={size.width}
        height={size.height}
        {...rest}
      />
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
    </div>
  );
};

BaseViewer.propTypes = {
  antialias: PropTypes.bool,
  engineOptions: PropTypes.object,
  adaptToDeviceRatio: PropTypes.bool,
  sceneOptions: PropTypes.object,
  onSceneReady: PropTypes.func,
  onRender: PropTypes.func,
  is2render: PropTypes.bool,
  sceneFactory: PropTypes.func
};

BaseViewer.defaultProps = {
  antialias: true,
  onSceneReady: scene => {},
  is2render: true,
  engineOptions: { preserveDrawingBuffer: true, stencil: true }
};

export default BaseViewer;
