class Action {
  constructor() {
    this.memory = {};
  }

  action(parentView) {
    parentView.getSceneMemory().forEach(memory => {
      memory.gizmoManager.attachedMesh = null;
      memory.camera.attachControl(memory.canvas, true);
    });
    parentView.highlightNodeInTree && parentView.highlightNodeInTree();
    parentView.highlightNodeInScene && parentView.highlightNodeInScene();
    parentView.closeContextDial && parentView.closeContextDial();
    parentView.setContextActionIndex && parentView.setContextActionIndex();
  }
}

export default Action;
