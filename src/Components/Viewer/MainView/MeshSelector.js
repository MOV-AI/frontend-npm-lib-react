export default class MeshSelector {
  constructor(mainView) {
    return mainView
      .getSceneMemory()
      .map(({ scene }) => {
        const sceneId = scene._uid;
        if (sceneId in placeHolderInstance) {
          return placeHolderInstance[sceneId];
        }
        this.scene = scene;
        this.mainView = mainView;
        this.meshSelectionSet = new Set();
        placeHolderInstance[sceneId] = this;
        return this;
      })
      .orSome(this);
  }

  /**
   * Add mesh 2 selected meshes
   * @param {*} mesh
   * @param {*} isSubtractive: if true, repeated addition of meshes will be removed from selected meshes set.
   */
  add(mesh, isSubtractive = true) {
    if (this.meshSelectionSet.has(mesh)) {
      isSubtractive && this.meshSelectionSet.delete(mesh);
    } else {
      this.meshSelectionSet.add(mesh);
    }
    return this;
  }

  addArray(meshes, isSubtractive = true) {
    meshes.forEach(mesh => this.add(mesh, isSubtractive));
    return this;
  }

  clear() {
    this.meshSelectionSet = new Set();
    return this;
  }

  meshes() {
    return [...this.meshSelectionSet];
  }

  has(mesh) {
    return this.meshSelectionSet.has(mesh);
  }

  filter(predicate) {
    const filteredSet = new Set();
    this.meshSelectionSet.forEach(mesh => {
      if (predicate(mesh)) filteredSet.add(mesh);
    });
    this.meshSelectionSet = filteredSet;
    return this;
  }

  //   forEach(lambda) {
  //     this.meshSelectionSet.forEach(lambda);
  //     return this;
  //   }

  static ofMainView(mainView) {
    return new MeshSelector(mainView);
  }
}

const placeHolderInstance = {};
