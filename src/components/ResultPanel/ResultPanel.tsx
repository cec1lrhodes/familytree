import type { NestedNode } from "../../types/tree";
import type { ActionType } from "../../types/action";

import { executeAction } from "../../utils/executeAction";
import { ResultView } from "./ResultView";

interface Props {
  tree: NestedNode[];
  selectedId: number | null;
  compareId: number | null;
  action: ActionType;
}

export function ResultPanel({ tree, selectedId, compareId, action }: Props) {
  if (selectedId === null) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="mb-2 text-lg font-semibold">Result</h3>

        <p className="text-slate-500">Select a node first.</p>
      </div>
    );
  }

  const result = executeAction(tree, selectedId, compareId, action);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="mb-2 text-lg font-semibold">Result</h3>

      <div className="mb-4 text-sm text-slate-500">
        Action: <span className="font-mono text-slate-700">{action}</span>
      </div>

      <ResultView result={result} />
    </div>
  );
}
