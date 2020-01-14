import React from "react";
import SceneViewer from "../src/Components/Viewer/SceneViewer";

export default {
  title: "Scene Viewer"
};

export const basicScene = <SceneViewer sceneName="Pedro"></SceneViewer>;

basicScene.story = {
  name: "basic scene"
};
