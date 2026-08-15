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

// [
//   {
//     id: 1,
//     name: "Ded",
//     children: [
//       {
//         id: 2,
//         name: "Tato",
//         children: [
//           { id: 3, name: "Sun", children: [] }
//         ]
//       }
//     ]
//   }
// ]

// [
//   { id: 1, name: "Ded", left: 1, right: 6, depth: 0, children: [...] },
//   { id: 2, name: "Tato",   left: 2, right: 5, depth: 1, children: [...] },
//   { id: 3, name: "Sun",    left: 3, right: 4, depth: 2, children: [...] }
// ]
