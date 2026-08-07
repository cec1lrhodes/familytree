import { useMemo } from "react";
import { buildTree } from "./utils/buidlTree";
import { type FamilyMember } from "./types/tree";
import { assignNestedSet } from "./utils/assignNestedSet.ts";
import { flattenTree } from "./utils/flattenTree.ts";
import { findRoot, findAllChildren } from "./utils/actions.ts";

export const familyTree: FamilyMember[] = [
  { id: 1, name: "Прадед Гриша", parentId: null },

  { id: 2, name: "Дед Вася", parentId: 1 },
  { id: 3, name: "Бабка Маша", parentId: 1 },
  { id: 4, name: "Дед Миша", parentId: 1 },

  { id: 5, name: "Тетя Таня", parentId: 2 },
  { id: 6, name: "Дядя Вадик", parentId: 2 },
  { id: 7, name: "Тетя Оля", parentId: 2 },
  { id: 8, name: "Тетя Валя", parentId: 2 },

  { id: 9, name: "Дядя Гарик", parentId: 3 },
  { id: 10, name: "Дядя Ваня", parentId: 3 },

  { id: 11, name: "Папа Сергей", parentId: 4 },
  { id: 12, name: "Тетя Ира", parentId: 4 },
  { id: 13, name: "Тетя Наташа", parentId: 4 },
  { id: 14, name: "Дядя Игорь", parentId: 4 },
  { id: 15, name: "Дядя Кирилл", parentId: 4 },

  // Дети Папы Сергея
  { id: 16, name: "Я (Вася)", parentId: 11 },
  { id: 17, name: "Сестра Аня", parentId: 11 },
  { id: 18, name: "Брат Коля", parentId: 11 },

  // Дети Тети Иры
  { id: 19, name: "Кузен Дима", parentId: 12 },
  { id: 20, name: "Кузина Лена", parentId: 12 },

  // Дети Тети Наташи
  { id: 21, name: "Кузина Света", parentId: 13 },
  { id: 22, name: "Кузен Саша", parentId: 13 },

  // Дети Дяди Игоря
  { id: 23, name: "Кузен Андрей", parentId: 14 },
  { id: 24, name: "Кузен Петр", parentId: 14 },

  // Дети Дяди Кирилла
  { id: 25, name: "Кузина Катя", parentId: 15 },
  { id: 26, name: "Кузен Женя", parentId: 15 },
  { id: 27, name: "Кузен Максим", parentId: 15 },

  // Дети Тети Тани
  { id: 28, name: "Кузен Рома", parentId: 5 },
  { id: 29, name: "Кузина Вика", parentId: 5 },

  // Дети Дяди Вадика
  { id: 30, name: "Кузен Тимур", parentId: 6 },
  { id: 31, name: "Кузен Олег", parentId: 6 },

  // Дети Тети Оли
  { id: 32, name: "Кузина Юля", parentId: 7 },

  // Дети Тети Вали
  { id: 33, name: "Кузина Алина", parentId: 8 },
  { id: 34, name: "Кузен Марк", parentId: 8 },

  // Дети Дяди Гарика
  { id: 35, name: "Кузен Артем", parentId: 9 },
  { id: 36, name: "Кузина Настя", parentId: 9 },

  // Дети Дяди Вани
  { id: 37, name: "Кузен Илья", parentId: 10 },

  // Дети "Я (Вася)"
  { id: 38, name: "Сын Даня", parentId: 16 },
  { id: 39, name: "Дочь София", parentId: 16 },

  // Дети Сестры Ани
  { id: 40, name: "Племянник Кирюша", parentId: 17 },

  // Дети Брата Коли
  { id: 41, name: "Племянница Мила", parentId: 18 },
];

function App() {
  // const tree = useMemo(() => buildTree(familyTree), []);
  // assignNestedSet(tree);

  const tree = useMemo(() => {
    const built = buildTree(familyTree);
    assignNestedSet(built); // розраховуємо ліві/праві межі один раз при створенні

    const flatTree = flattenTree(built);
    return flatTree;
  }, []);

  const children = findAllChildren(tree, 11);
  console.log(children);

  console.log(tree);
  return (
    <div style={{ padding: "20px" }}>
      <h3>TREE (FLATTED):</h3>

      {tree.map((node) => (
        <div
          key={node.id}
          style={{
            paddingLeft: `${node.depth * 24}px`,
            margin: "8px 0",
            display: "flex",
            alignItems: "center",
          }}
        >
          {node.depth > 0 && (
            <span style={{ color: "#ccc", marginRight: "8px" }}>—</span>
          )}

          <div>
            <strong>{node.name}</strong>
            <small style={{ color: "gray", marginLeft: "10px" }}>
              (ID: {node.id} | L: {node.left}, R: {node.right})
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
