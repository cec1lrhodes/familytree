import { actions } from "../types/action";
import { type ActionType } from "../types/action";
import { type NestedNode } from "../types/tree";

interface Props {
  nodes: NestedNode[];
  selectedId: number | null;
  compareId: number | null;

  action: ActionType;

  onChange(action: ActionType): void;
  onCompareChange(id: number): void;
}

export function ActionPanel({
  nodes,
  selectedId,
  compareId,
  action,
  onChange,
  onCompareChange,
}: Props) {
  const requiresCompareNode =
    action === "isAncestor" || action === "isDescendant";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Action
      </h3>

      <select
        value={action}
        onChange={(e) => onChange(e.target.value as ActionType)}
        className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      >
        {actions.map((action) => (
          <option key={action} value={action}>
            {action}
          </option>
        ))}
      </select>

      {requiresCompareNode && (
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Compare with
          </label>

          <select
            value={compareId ?? ""}
            onChange={(event) => onCompareChange(Number(event.target.value))}
            className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="" disabled>
              Select node
            </option>

            {nodes.map((node) => (
              <option key={node.id} value={node.id}>
                {node.name} — ID: {node.id}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedId !== null && (
        <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-500">
          <span>Selected</span>
          <span className="font-mono text-slate-700">id · {selectedId}</span>
        </div>
      )}
    </div>
  );
}
