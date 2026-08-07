import type { TreeNode, NestedNode } from "../types/tree";

function dfs(node: TreeNode, result: NestedNode[]) {
  // Використовуємо 'as NestedNode', бо ми впевнені, що left/right/depth вже заповнені
  result.push(node as NestedNode);

  for (const child of node.children) {
    dfs(child, result);
  }
}

export function flattenTree(tree: TreeNode[]): NestedNode[] {
  const result: NestedNode[] = [];

  for (const root of tree) {
    dfs(root, result);
  }

  return result;
}
