import { useMemo, useState } from "react";

import { TreeList } from "./components/TreeList";
import { ActionPanel } from "./components/ActionPanel";
import { ResultPanel } from "./components/ResultPanel";
import { SelectedNodeCard } from "./components/SelectedNodeCard";

import { familyTree } from "./data/treeData";

import { buildTree } from "./utils/buidlTree";
import { assignNestedSet } from "./utils/assignNestedSet.ts";
import { flattenTree } from "./utils/flattenTree";

import type { ActionType } from "./types/action";

function App() {
  const tree = useMemo(() => {
    const built = buildTree(familyTree);

    assignNestedSet(built);

    return flattenTree(built);
  }, []);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [action, setAction] = useState<ActionType>("findParent");

  const [compareId, setCompareId] = useState<number | null>(null);

  const selectedNode = useMemo(
    () => tree.find((node) => node.id === selectedId),
    [tree, selectedId],
  );

  const handleSelectNode = (id: number) => {
    setSelectedId(id);
    setCompareId(null);
  };

  const handleActionChange = (newAction: ActionType) => {
    setAction(newAction);

    if (newAction !== "isAncestor" && newAction !== "isDescendant") {
      setCompareId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-6">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Nested Set Model
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Nested Set Explorer
          </h1>
        </div>

        <SelectedNodeCard node={selectedNode} />

        <div className="mt-6 flex flex-col items-start gap-6 lg:flex-row">
          <TreeList
            nodes={tree}
            selectedId={selectedId}
            onSelect={handleSelectNode}
          />

          <div className="w-full flex-1 space-y-6">
            <ActionPanel
              nodes={tree}
              selectedId={selectedId}
              compareId={compareId}
              action={action}
              onChange={handleActionChange}
              onCompareChange={setCompareId}
            />

            <ResultPanel
              tree={tree}
              selectedId={selectedId}
              compareId={compareId}
              action={action}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
