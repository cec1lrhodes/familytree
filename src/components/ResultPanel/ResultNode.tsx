import type { NestedNode, TreeNode } from "../../types/tree";
import type { ActionResult } from "../../utils/executeAction";

interface Props {
  node: NestedNode | TreeNode;
}
export function ResultNode({ node }: Props) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <div className="font-medium">{node.name}</div>

      <div className="mt-1 text-xs text-slate-500">id · {node.id}</div>

      {"left" in node &&
        node.left !== undefined &&
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
  );
}
