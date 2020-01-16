import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import ReactResizeDetector from "react-resize-detector";
import PropTypes from "prop-types";
import { Engine } from "babylonjs";

/**
 *  props:
 *    @param createScene: (Engine, canvas) => scene, function responsible for creating a scene
 *    @param is2render: Boolean, boolean responsible for rendering the scene in the beginning
 */
class BaseViewer extends Component {
  state = {
    size: { width: "100px", height: "100px" }
  };

  addEventListeners = () => this.props.addEventListeners2Canvas(this.canvas);

  componentDidMount() {
    this.addEventListeners();
    this.engine = new Engine(this.canvas, true, {
      stencil: true
    });
    const scene = this.props.createScene(this.engine, this.canvas);
    if (this.props.is2render) {
      this.engine.runRenderLoop(() => {
        scene.render();
      });
    }
  }

  getCanvas = () => this.canvas;

  onResize = (width, height) => {
    console.log("Canvas on resize", width, height);
    this.setState({ size: { width: width, height: height } });
  };

  getSize = () => this.state.size;

  render() {
    return (
      <Typography
        component="div"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1
        }}
      >
        <canvas
          ref={canvas => (this.canvas = canvas)}
          style={{ flexGrow: 1 }}
          width={this.state.size.width}
          height={this.state.size.height}
        />
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.onResize}
        />
      </Typography>
    );
  }
}

BaseViewer.propTypes = {
  createScene: PropTypes.func,
  is2render: PropTypes.bool,
  addEventListeners2Canvas: PropTypes.func
};

BaseViewer.defaultProps = {
  createScene: (engine, canvas) => {},
  is2render: true,
  addEventListeners2Canvas: canvas => {}
};
export default BaseViewer;
