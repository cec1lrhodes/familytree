import { type NestedNode, type TreeNode } from "../types/tree";
import { buildTree } from "./buidlTree";

// HELPER
function getNode(tree: NestedNode[], id: number) {
  return tree.find((node) => node.id === id);
}

export function findRoot(tree: NestedNode[]) {
  return tree.find((node) => node.depth === 0);
}

// усі nodes na n-depth
export function findDepthNodes(tree: NestedNode[], depth: number) {
  return tree.filter((node) => node.depth === depth);
}

// 1. ВСІ НАЩАДКИ
export function findAllChildren(
  tree: NestedNode[],
  parentId: number,
): NestedNode[] {
  const parent = getNode(tree, parentId);
  if (!parent) {
    return [];
  }

  return tree.filter(
    (node) => node.left > parent.left && node.right < parent.right,
  );
}

// 2. Тількі прямі діти
export function findDirectChildren(
  tree: NestedNode[],
  parentId: number,
): NestedNode[] {
  const parent = getNode(tree, parentId);

  if (!parent) {
    return [];
  }

  return tree.filter(
    (node) =>
      node.left > parent.left &&
      node.right < parent.right &&
      node.depth === parent.depth + 1,
  );
}

// 3. Прямий батько
export function findParent(
  tree: NestedNode[],
  userId: number,
): NestedNode | undefined {
  const node = getNode(tree, userId);

  if (!node) {
    return undefined;
  }

  // find Бо батько завжди один
  return tree.find(
    (candidate) =>
      candidate.left < node.left &&
      candidate.right > node.right &&
      candidate.depth === node.depth - 1,
  );
}

// 4. всі нащадки до корня
export function findAllParent(
  tree: NestedNode[],
  userId: number,
): NestedNode[] {
  const node = getNode(tree, userId);

  if (!node) {
    return [];
  }

  return tree
    .filter(
      (candidate) => candidate.left < node.left && candidate.right > node.right,
    )
    .sort((a, b) => a.depth - b.depth);
}

// 5. всі брати і сестри
export function findSiblings(tree: NestedNode[], userId: number): NestedNode[] {
  const parent = findParent(tree, userId);

  if (!parent) {
    return [];
  }

  return findDirectChildren(tree, parent.id);
}

// 6. тількі рідні брати сестри
export function findDirectSiblings(
  tree: NestedNode[],
  userId: number,
): NestedNode[] {
  return findSiblings(tree, userId).filter((node) => node.id !== userId);
}

// 7. всі нащадки листя (немає дітей)
export function findLeaves(tree: NestedNode[], parentId: number): NestedNode[] {
  return findAllChildren(tree, parentId).filter(
    (node) => node.right - node.left === 1,
    // right - left === 1 у node гарантовано немає дітей
  );
}

// 8. кількість всіх нащадків
export function countDescendants(tree: NestedNode[], parentId: number): number {
  const parent = getNode(tree, parentId);

  if (!parent) {
    return 0;
  }

  return (parent.right - parent.left - 1) / 2;
}

// 9. кількість прямих дітей
export function countDirectChildren(
  tree: NestedNode[],
  parentId: number,
): number {
  return findDirectChildren(tree, parentId).length;
}

// 10. шлях від корня до вузла
export function findPath(tree: NestedNode[], userId: number): NestedNode[] {
  const node = getNode(tree, userId);

  if (!node) {
    return [];
  }

  const parents = findAllParent(tree, userId);

  return [...parents, node];
}

// 11. vsi vuzlu na n-rivni
export function getAllNodesAtLevel(
  tree: NestedNode[],
  level: number,
): NestedNode[] {
  return findDepthNodes(tree, level);
}

// 12. vuzl e predkom ?
export function isAncestor(
  tree: NestedNode[],
  ancestorId: number,
  nodeId: number,
): boolean {
  const ancestor = getNode(tree, ancestorId);
  const node = getNode(tree, nodeId);

  if (!ancestor || !node) {
    return false;
  }

  return ancestor.left < node.left && ancestor.right > node.right;
}

// 13. vuzul e nashadkom ?
export function isDescendant(
  tree: NestedNode[],
  nodeId: number,
  ancestorId: number,
): boolean {
  return isAncestor(tree, ancestorId, nodeId);
}

// 13. SUBTREE
export function getSubtree(
  tree: NestedNode[],
  parentId: number,
): TreeNode | null {
  const parent = getNode(tree, parentId);

  if (!parent) {
    return null;
  }

  const nodes = [parent, ...findAllChildren(tree, parentId)];

  // Для кореня піддерева parentId має стати null,
  // інакше buildTree не зробить його root.
  const subtreeData = nodes.map((node) =>
    node.id === parentId ? { ...node, parentId: null } : node,
  );

  const roots = buildTree(subtreeData);

  return roots[0] ?? null;
}
