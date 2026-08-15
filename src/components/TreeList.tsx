import type { NestedNode } from "../types/tree";

interface Props {
  nodes: NestedNode[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export function TreeList({ nodes, selectedId, onSelect }: Props) {
  return (
    <div className="w-full lg:w-96">
      <h2 className="mb-3 text-lg font-semibold">Family Tree</h2>

      <div className="space-y-1">
        {nodes.map((node) => {
          const isSelected = node.id === selectedId;

          return (
            <button
              key={node.id}
              onClick={() => onSelect(node.id)}
              className={`w-full rounded-lg px-3 py-2 text-left transition ${
                isSelected
                  ? "bg-indigo-100 text-indigo-900"
                  : "hover:bg-slate-100"
              }`}
              style={{
                paddingLeft: `${node.depth * 24 + 12}px`,
              }}
            >
              <div className="flex items-center gap-2">
                {node.depth > 0 && <span className="text-slate-300">\--</span>}

                <span className="font-medium">{node.name}</span>
              </div>

              <div className="ml-5 text-xs text-slate-400">
                ID: {node.id} · [{node.left}, {node.right}] · depth:{" "}
                {node.depth}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
