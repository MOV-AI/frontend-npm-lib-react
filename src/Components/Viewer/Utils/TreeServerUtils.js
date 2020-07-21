import TreeObject from "../TreeObject/TreeObject";
import TreeNode from "../TreeObject/TreeNode";
import GlobalRef from "../NodeItem/GlobalRef";
import { MasterDB } from "mov-fe-lib-core";
import Constants from "./Constants";

const CLOUD_FUNCTION_NAME = Constants.CLOUD_FUNCTION_NAME;

class TreeServerUtils {
  constructor(sceneName) {
    this.sceneName = sceneName;
  }

  static ofScene(sceneName) {
    return new TreeServerUtils(sceneName);
  }

  //========================================================================================
  /*                                                                                      *
   *                                    Util functions                                    *
   *                                                                                      */
  //========================================================================================

  getNodeFromTree = (name, objectTree) => {
    return new TreeObject(objectTree).getNode(x => name === x.title);
  };

  getParentFromChild = (childName, objectTree) => {
    return new TreeObject(objectTree).getParentNode(x => childName === x.title);
  };

  deleteNodeFromTreeUsingName = (name, objectTree, is2delInServer = true) => {
    this.getNodeFromTree(name, objectTree).forEach(node => {
      // destroy treeNode
      TreeNode.dispose(node);

      if (is2delInServer) {
        this.deleteNodeInServer(name);
      }

      const maybeParent = this.getParentFromChild(name, objectTree);
      maybeParent.forEach(parentNode => {
        parentNode.children = parentNode.children.filter(x => x.title !== name);
      });

      objectTree = objectTree.filter(x => x.title !== name);
    });
    return objectTree;
  };

  getNodeFromTreeWithPredicate = (predicate, objectTree) => {
    return new TreeObject(objectTree).getNode(predicate);
  };

  addNodeItem2Tree = (
    objectTree,
    nodeItem,
    parentName = GlobalRef.NAME,
    is2addInServer = true,
    isVisible = true
  ) => {
    // delete if already exist
    this.deleteNodeFromTreeUsingName(nodeItem.name, objectTree, is2addInServer);

    const node2Add = TreeNode.builder()
      .title(nodeItem.name)
      .item(nodeItem)
      .isVisible(isVisible)
      .build();

    if (parentName) {
      const maybeParentNode = this.getNodeFromTree(parentName, objectTree);
      maybeParentNode.forEach(parentNode => {
        if (is2addInServer) this.addNodeItem2Server(node2Add, parentNode.title);
        parentNode.children.push(node2Add);
      });
    } else {
      objectTree.push(node2Add);
      if (is2addInServer) this.addNodeItem2Server(node2Add, null);
    }
    return objectTree;
  };

  //========================================================================================
  /*                                                                                      *
   *                                   Server functions                                   *
   *                                                                                      */
  //========================================================================================

  updateNodeInServer = (name, objectTree, oldName = null) => {
    console.log("updateNodeInServer!", this.sceneName);
    this.getNodeFromTree(name, objectTree).forEach(node => {
      const parentName = this.getParentFromChild(name, objectTree)
        .map(x => x.title)
        .orNull();
      MasterDB.cloudFunction(
        CLOUD_FUNCTION_NAME,
        "updateNode",
        [TreeNode.toDict(node), parentName, oldName, this.sceneName],
        data => {
          console.log("Update node with success?", data.success);
        }
      );
    });
  };

  addNodeItem2Server = (treeNode, parentName) => {
    MasterDB.cloudFunction(
      CLOUD_FUNCTION_NAME,
      "addNodeItem",
      [TreeNode.toDict(treeNode), parentName, this.sceneName],
      data => {
        console.log("Add node with success?", data.success);
      }
    );
  };

  deleteNodeInServer = name => {
    MasterDB.cloudFunction(
      CLOUD_FUNCTION_NAME,
      "deleteNodeByName",
      [name, this.sceneName],
      data => {
        console.log("Deleted node with success?", data.success);
      }
    );
  };
}

export default TreeServerUtils;
