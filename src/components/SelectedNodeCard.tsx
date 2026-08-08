import type { NestedNode } from "../types/tree";

interface Props {
  node?: NestedNode;
}

export function SelectedNodeCard({ node }: Props) {
  if (!node) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-6 text-sm text-slate-400">
        No node selected — pick one from the tree below.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{node.name}</h2>
          <p className="mt-0.5 font-mono text-xs text-slate-400">
            id · {node.id}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-md bg-indigo-50 px-2.5 py-1 font-mono text-sm text-indigo-700">
            [{node.left}, {node.right}]
          </span>
          <span className="rounded-md bg-amber-50 px-2.5 py-1 font-mono text-sm text-amber-700">
            depth {node.depth}
          </span>
        </div>
      </div>
    </div>
  );
}
