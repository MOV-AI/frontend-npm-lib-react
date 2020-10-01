//========================================================================================
/*                                                                                      *
 *         Based from https://doc.babylonjs.com/resources/babylonjs_and_reactjs         *
 *                                                                                      */
//========================================================================================

import { Engine, Scene } from "@babylonjs/core";
import React, { useEffect, useRef, useState } from "react";
import ReactResizeDetector from "react-resize-detector";
import PropTypes from "prop-types";
const FLEX_STYLE = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1
};

const BaseViewer = props => {
  const reactCanvas = useRef(null);
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

  const [loaded, setLoaded] = useState(false);
  const [scene, setScene] = useState(null);
  const [size, setSize] = useState({ width: 100, height: 100 });

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      const engine = new Engine(
        reactCanvas.current,
        antialias,
        engineOptions,
        adaptToDeviceRatio
      );
      const scene = sceneFactory
        ? sceneFactory(engine)
        : new Scene(engine, sceneOptions);
      setScene(scene);
      if (scene.isReady()) {
        props.onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce(scene => props.onSceneReady(scene));
      }
      if (!is2render) return;
      engine.runRenderLoop(() => {
        if (typeof onRender === "function") {
          onRender(scene);
        }
        scene.render();
      });
    }

    return () => {
      if (scene !== null) scene.dispose();
    };
  }, [reactCanvas]);

  const onResize = (width, height) => {
    setSize({
      width,
      height: height <= window.innerHeight ? height : window.innerHeight * 0.85
    });
    scene && scene.getEngine().resize();
  };

  loaded && reactCanvas.current.focus();
  return (
    <div style={{ ...FLEX_STYLE }}>
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
  is2render: true
};

export default BaseViewer;
