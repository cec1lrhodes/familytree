import type { NestedNode, TreeNode } from "../types/tree";
import type { ActionType } from "../types/action";

import {
  findRoot,
  findParent,
  findAllParent,
  findAllChildren,
  findDirectChildren,
  findSiblings,
  findDirectSiblings,
  findLeaves,
  findPath,
  countDescendants,
  countDirectChildren,
  findDepthNodes,
  getAllNodesAtLevel,
  getSubtree,
  isAncestor,
  isDescendant,
} from "../utils/actions";

interface Props {
  tree: NestedNode[];
  selectedId: number | null;
  compareId: number | null;
  action: ActionType;
}

type Result =
  | NestedNode[]
  | NestedNode
  | TreeNode
  | number
  | boolean
  | null
  | undefined;

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

      {(action === "isAncestor" || action === "isDescendant") && (
        <div className="mb-4 rounded-lg bg-slate-50 p-3 text-sm">
          <div>
            Selected ID: <strong>{selectedId}</strong>
          </div>

          <div>
            Compare ID: <strong>{compareId ?? "not selected"}</strong>
          </div>
        </div>
      )}

      <ResultView result={result} />
    </div>
  );
}

function executeAction(
  tree: NestedNode[],
  selectedId: number,
  compareId: number | null,
  action: ActionType,
): Result {
  const selectedNode = tree.find((node) => node.id === selectedId);

  if (!selectedNode) {
    return null;
  }

  switch (action) {
    case "findRoot":
      return findRoot(tree);

    case "findParent":
      return findParent(tree, selectedId);

    case "findAllParent":
      return findAllParent(tree, selectedId);

    case "findAllChildren":
      return findAllChildren(tree, selectedId);

    case "findDirectChildren":
      return findDirectChildren(tree, selectedId);

    case "findSiblings":
      return findSiblings(tree, selectedId);

    case "findDirectSiblings":
      return findDirectSiblings(tree, selectedId);

    case "findLeaves":
      return findLeaves(tree, selectedId);

    case "findPath":
      return findPath(tree, selectedId);

    case "countDescendants":
      return countDescendants(tree, selectedId);

    case "countDirectChildren":
      return countDirectChildren(tree, selectedId);

    case "findDepthNodes":
      return findDepthNodes(tree, selectedNode.depth);

    case "getAllNodesAtLevel":
      return getAllNodesAtLevel(tree, selectedNode.depth);

    case "getSubtree":
      return getSubtree(tree, selectedId);

    case "isAncestor":
      if (compareId === null) {
        return null;
      }

      return isAncestor(tree, selectedId, compareId);

    case "isDescendant":
      if (compareId === null) {
        return null;
      }

      return isDescendant(tree, selectedId, compareId);

    default:
      return null;
  }
}

function ResultView({ result }: { result: Result }) {
  if (result === null || result === undefined) {
    return <p className="text-slate-500">No result</p>;
  }

  if (typeof result === "boolean") {
    return (
      <div className="text-2xl font-bold">{result ? "TRUE" : "FALSE"}</div>
    );
  }

  if (typeof result === "number") {
    return <div className="text-2xl font-bold">{result}</div>;
  }

  if (Array.isArray(result)) {
    if (result.length === 0) {
      return <p className="text-slate-500">Empty result</p>;
    }

    return (
      <div className="space-y-2">
        {result.map((node) => (
          <ResultNode key={node.id} node={node} />
        ))}
      </div>
    );
  }

  return <ResultNode node={result} />;
}

function ResultNode({ node }: { node: NestedNode | TreeNode }) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <div className="font-medium">{node.name}</div>

      <div className="mt-1 text-xs text-slate-500">id · {node.id}</div>

      {"left" in node && (
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
