class Action {
  constructor() {
    this.memory = {};
  }

  action(parentView) {
    parentView.getSceneMemory().forEach(memory => {
      memory.gizmoManager.attachedMesh = null;
      memory.camera.attachControl(memory.canvas, true);
    });
    parentView.closeContextDial && parentView.closeContextDial();
    parentView.setContextActionIndex && parentView.setContextActionIndex();
  }

  onChange(parentView) {
    // to be overwritten by children
  }
}

export default Action;
