import type { TreeNode, FamilyMember } from "../types/tree";

export const buildTree = (data: FamilyMember[]): TreeNode[] => {
  // id:1 {id:1,name:'bla-bla',parentId:null,children:[blabla]}
  const map: Record<number, TreeNode> = {};

  const roots: TreeNode[] = [];

  for (const node of data) {
    map[node.id] = {
      ...node,
      children: [],
    };
  }

  for (const node of data) {
    if (node.parentId === null) {
      // null значить, що немає батька, тобто це предок головний
      // чи є поточний елемент найстаршим предком
      roots.push(map[node.id]);
    } else {
      map[node.parentId].children.push(map[node.id]);
    }
  }

  return roots;
};
