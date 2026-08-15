import type { TreeNode } from "../types/tree";

let counter = 1;

// depth
function dfs(node: TreeNode, depth: number) {
  node.depth = depth;
  node.left = counter++; // входимо у вузол

  for (const child of node.children) {
    dfs(child, depth + 1);
  }

  node.right = counter++; // вихід з вузла
}

export function assignNestedSet(tree: TreeNode[]) {
  counter = 1;

  for (const root of tree) {
    dfs(root, 0);
  }

  return tree;
}
