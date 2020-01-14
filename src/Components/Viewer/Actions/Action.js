class Action {
  constructor() {
    this.memory = {};
  }

  action(parentView) {
    parentView.getSceneMemory().forEach(memory => {
      memory.gizmoManager.attachedMesh = null;
    });
    parentView.highlightNodeInTree && parentView.highlightNodeInTree();
    parentView.highlightNodeInScene && parentView.highlightNodeInScene();
  }
}

export default Action;
