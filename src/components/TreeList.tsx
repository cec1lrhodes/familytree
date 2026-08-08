import type { NestedNode } from "../types/tree";

interface PropsList {
  nodes: NestedNode[];

  selectedId: number | null;

  onSelect(id: number): void;
}

export function TreeList({ nodes, selectedId, onSelect }: PropsList) {
  return (
    <div className="w-full shrink-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:w-80">
      <h3 className="mb-2 px-1 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Family Tree
      </h3>

      <div className="space-y-0.5">
        {nodes.map((node) => {
          const isSelected = selectedId === node.id;
          return (
            <div
              key={node.id}
              onClick={() => onSelect(node.id)}
              style={{ marginLeft: node.depth * 18 }}
              className={[
                "relative cursor-pointer rounded-lg py-2 pl-3 pr-2 text-sm transition-colors",
                node.depth > 0 ? "border-l-2 border-slate-100" : "",
                isSelected
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-50",
              ].join(" ")}
            >
              {node.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
