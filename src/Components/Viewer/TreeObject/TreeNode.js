class TreeNode {
  constructor(title, item, children, expanded, isVisible, isStatic = false) {
    this.title = title;
    this.item = item;
    this.children = children;
    this.expanded = expanded;
    this.isVisible = isVisible;
    this.isStatic = isStatic;
  }

  static dispose(node) {
    /*
     * function must be defined here, otherwise it wouldn't work on the UI Tree change method
     */
    node.item.dispose();
    node.children.forEach(child => {
      TreeNode.dispose(child);
    });
  }

  /**
   *
   * @param {*} node
   */
  static toDict(node) {
    /*
     * function must be defined here, otherwise it wouldn't work on the UI Tree change method
     */
    return {
      name: node.title,
      item: node.item.toDict(),
      children: node.children.map(child => TreeNode.toDict(child))
    };
  }

  static builder() {
    return new TreeNodeBuilder();
  }
}

class TreeNodeBuilder {
  constructor() {
    this._title = null;
    this._item = {};
    this._children = [];
    this._expanded = false;
    this._isVisible = true;
    this._isStatic = false;
  }

  /**
   * Node title shown on the tree
   * @param {*} title : Node name displayed on the tree
  */
  title(title) {
    this._title = title;
    return this;
  }

  /**
   * Represents the node item - an instance of the NodeItem class
   * @param {*} item : Node item
  */
  item(item) {
    this._item = item;
    return this;
  }

  /**
   * List of nodes children under the object
   * @param {*} children : Children list
  */
  children(children) {
    this._children = children;
    return this;
  }

  /**
   * Indicate the node expansion state, if true means the node is expanded in the scene
   * @param {*} expanded : expansion state
  */
  expanded(expanded) {
    this._expanded = expanded;
    return this;
  }

  /**
   * Indicate the node visibility state, if true means the node is visible in the scene
   * @param {*} isVisible : visibility state
  */
  isVisible(isVisible) {
    this._isVisible = isVisible;
    return this;
  }

  /**
   * A static node can't have any children in the object tree and its parent must be of type GlobalRef
   * @param {*} isStatic : static state
  */
  isStatic(isStatic) {
    this._isStatic = isStatic;
    return this;
  }

  /**
   * Build the TreeNode object
  */
  build() {
    Object.values(this).forEach(value => {
      if (value === null)
        throw new Error(
          `There are missing variables to build a TreeNode, e.g ${value}`
        );
    });
    return new TreeNode(
      this._title,
      this._item,
      this._children,
      this._expanded,
      this._isVisible,
      this._isStatic,
    );
  }
}

export default TreeNode;
