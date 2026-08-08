import type { NestedNode, TreeNode } from "../types/tree";
import type { ActionType } from "../types/action";

import {
  findRoot,
  findParent,
  findAllParent,
  findAllChildren,
  findDirectChildren,
  findSiblings,
  findDirectSiblings,
  findLeaves,
  findPath,
  countDescendants,
  countDirectChildren,
  findDepthNodes,
  getAllNodesAtLevel,
  getSubtree,
  isAncestor,
  isDescendant,
} from "./actions";

export type ActionResult =
  | NestedNode[]
  | NestedNode
  | TreeNode
  | number
  | boolean
  | null
  | undefined;

export function executeAction(
  tree: NestedNode[],
  selectedId: number,
  compareId: number | null,
  action: ActionType,
): ActionResult {
  const selectedNode = tree.find((node) => node.id === selectedId);

  if (!selectedNode) {
    return null;
  }

  switch (action) {
    case "findRoot":
      return findRoot(tree);

    case "findParent":
      return findParent(tree, selectedId);

    case "findAllParent":
      return findAllParent(tree, selectedId);

    case "findAllChildren":
      return findAllChildren(tree, selectedId);

    case "findDirectChildren":
      return findDirectChildren(tree, selectedId);

    case "findSiblings":
      return findSiblings(tree, selectedId);

    case "findDirectSiblings":
      return findDirectSiblings(tree, selectedId);

    case "findLeaves":
      return findLeaves(tree, selectedId);

    case "findPath":
      return findPath(tree, selectedId);

    case "countDescendants":
      return countDescendants(tree, selectedId);

    case "countDirectChildren":
      return countDirectChildren(tree, selectedId);

    case "findDepthNodes":
      return findDepthNodes(tree, selectedNode.depth);

    case "getAllNodesAtLevel":
      return getAllNodesAtLevel(tree, selectedNode.depth);

    case "getSubtree":
      return getSubtree(tree, selectedId);

    case "isAncestor":
      if (compareId === null) {
        return null;
      }

      return isAncestor(tree, selectedId, compareId);

    case "isDescendant":
      if (compareId === null) {
        return null;
      }

      return isDescendant(tree, selectedId, compareId);

    default:
      return null;
  }
}
