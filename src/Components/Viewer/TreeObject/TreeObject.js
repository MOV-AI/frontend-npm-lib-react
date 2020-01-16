import { Maybe } from "monet";

function getNodeRecursive(tree, predicate) {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (predicate(node)) return Maybe.some(node);
    const answer = getNodeRecursive(node.children, predicate);
    if (answer.isSome()) return answer;
  }
  return Maybe.none();
}

function getParentNodeRecursive(tree, predicate, parent) {
  const foundChild = tree
    .map(x => predicate(x))
    .reduce((e, x) => e || x, false);
  if (foundChild) return Maybe.fromNull(parent);
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    const answer = getParentNodeRecursive(node.children, predicate, node);
    if (answer.isSome()) return answer;
  }
  return Maybe.none();
}

function compareTreesRecursive(treeA, treeB, nodeEquality) {
  if (treeA.length == treeB.length) {
    let ans = true;
    for (let i = 0; i < treeA.length; i++) {
      const nodeA = treeA[i];
      const nodeB = treeB[i];
      if (nodeEquality(nodeA, nodeB)) {
        ans =
          ans &&
          compareTreesRecursive(nodeA.children, nodeB.children, nodeEquality);
      } else {
        return false;
      }
    }
    return ans;
  }
  return false;
}

function mapRecursive(tree, newTree, map) {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    const mappedNode = map(node);
    mappedNode.children = [];
    mapRecursive(node.children, mappedNode.children, map);
    newTree.push(mappedNode);
  }
  return newTree;
}

function expand(node) {
  node.expanded = true;
  return node;
}

function filterTree(tree = [], predicate = node => true) {
  if (!tree || tree.length === 0) return [];
  let result = [];
  tree.forEach(nod => {
    const node = { ...nod };
    if (predicate(node)) result.push(expand(node));
    else if (node.children) {
      const children = filterTree(node.children, predicate);
      if (children.length !== 0) {
        node.children = children;
        result.push(expand(node));
      }
    }
  });
  return result;
}

/**
 * General purpose tree
 *
 * It just need a basic structure as input:
 *  Tree: Array<Node>
 *  Node: {children: Array<Node>}
 */
class TreeObject {
  constructor(tree) {
    this.tree = tree;
  }
  /**
   * Return maybe node based on predicate
   * @param {*} predicate
   */
  getNode(predicate) {
    return getNodeRecursive(this.tree, predicate);
  }

  /**
   * return maybe parent node based on the child predicate
   * @param {*} childPredicate
   */
  getParentNode(childPredicate) {
    return getParentNodeRecursive(this.tree, childPredicate, null);
  }

  equals(tree, nodeEquality = (a, b) => a === b) {
    if (tree.constructor === TreeObject) {
      return compareTreesRecursive(this.tree, tree.tree, nodeEquality);
    }
    return compareTreesRecursive(this.tree, tree, nodeEquality);
  }

  map(nodeMap) {
    return new TreeObject(mapRecursive(this.tree, [], nodeMap));
  }

  filter(predicate = node => true) {
    return filterTree(this.tree, predicate);
  }
}

export default TreeObject;
