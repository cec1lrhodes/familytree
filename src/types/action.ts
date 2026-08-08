export const actions = [
  "findParent",
  "findAllParent",
  "findAllChildren",
  "findDirectChildren",
  "findLeaves",
  "countDescendants",
  "countDirectChildren",
  "findSiblings",
  "findDirectSiblings",
  "findPath",
  "findRoot",
  "findDepthNodes",
  "getAllNodesAtLevel",
  "getSubtree",
  "isAncestor",
  "isDescendant",
] as const;

export type ActionType = (typeof actions)[number];
