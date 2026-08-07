export interface FamilyMember {
  id: number;
  name: string;
  parentId: number | null;

  left?: number;
  right?: number;
  depth?: number;
}

export interface TreeNode {
  id: number;
  name: string;
  parentId: number | null;

  children: TreeNode[];

  left?: number;
  right?: number;
  depth?: number;
}

export interface NestedNode {
  id: number;
  name: string;
  parentId: number | null;
  left: number;
  right: number;
  depth: number;
}
