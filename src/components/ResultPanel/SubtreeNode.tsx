import type { TreeNode } from "../../types/tree";

interface Props {
  node: TreeNode;
}

export function SubtreeNode({ node }: Props) {
  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-slate-200 bg-white p-3">
        <div className="font-medium">{node.name}</div>

        <div className="mt-1 text-xs text-slate-500">id · {node.id}</div>

        {node.left !== undefined &&
          node.right !== undefined &&
          node.depth !== undefined && (
            <div className="mt-2 flex items-center gap-1.5 font-mono text-xs">
              <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-indigo-700">
                [{node.left}, {node.right}]
              </span>

              <span className="rounded bg-amber-50 px-1.5 py-0.5 text-amber-700">
                d{node.depth}
              </span>
            </div>
          )}
      </div>

      {node.children.length > 0 && (
        <div className="ml-6 border-l border-slate-200 pl-4">
          {node.children.map((child) => (
            <SubtreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
