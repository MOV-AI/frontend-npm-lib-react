class TreeNode {
  constructor(title, item, children, expanded, isVisible) {
    this.title = title;
    this.item = item;
    this.children = children;
    this.expanded = expanded;
    this.isVisible = isVisible;
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
    this._expanded = true;
    this._isVisible = true;
  }

  title(title) {
    this._title = title;
    return this;
  }

  item(item) {
    this._item = item;
    return this;
  }

  children(children) {
    this._children = children;
    return this;
  }

  expanded(expanded) {
    this._expanded = expanded;
    return this;
  }

  isVisible(isVisible) {
    this._isVisible = isVisible;
    return this;
  }

  build() {
    Object.values(this).forEach(value => {
      if (value === null)
        throw `There are missing variables to build a TreeNode, e.g ${value}`;
    });
    return new TreeNode(
      this._title,
      this._item,
      this._children,
      this._expanded,
      this._isVisible
    );
  }
}

export default TreeNode;
