import type { NestedNode, TreeNode } from "../../types/tree";
import type { ActionResult } from "../../utils/executeAction";

import { ResultNode } from "./ResultNode";
import { SubtreeNode } from "./SubtreeNode";

interface Props {
  result: ActionResult;
}

export function ResultView({ result }: Props) {
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

  if ("children" in result) {
    return <SubtreeNode node={result} />;
  }

  return <ResultNode node={result} />;
}
