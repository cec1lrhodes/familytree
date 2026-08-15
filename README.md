OUTPUT after assignNestedSet: (але треба рекурисвно пройтись для UI)

Прадед Гриша(L: 1, R: 82, D: 0)
Дед Вася(L: 2, R: 25, D: 1)
Тетя Таня(L: 3, R: 8, D: 2)
Кузен Рома(L: 4, R: 5, D: 3)
Кузина Вика(L: 6, R: 7, D: 3)
Дядя Вадик(L: 9, R: 14, D: 2)
Кузен Тимур(L: 10, R: 11, D: 3)
Кузен Олег(L: 12, R: 13, D: 3)
Тетя Оля(L: 15, R: 18, D: 2)
Кузина Юля(L: 16, R: 17, D: 3)
Тетя Валя(L: 19, R: 24, D: 2)
Кузина Алина(L: 20, R: 21, D: 3)
Кузен Марк(L: 22, R: 23, D: 3)
Бабка Маша(L: 26, R: 37, D: 1)
Дядя Гарик(L: 27, R: 32, D: 2)
Кузен Артем(L: 28, R: 29, D: 3)
Кузина Настя(L: 30, R: 31, D: 3)
Дядя Ваня(L: 33, R: 36, D: 2)
Кузен Илья(L: 34, R: 35, D: 3)
Дед Миша(L: 38, R: 81, D: 1)
Папа Сергей(L: 39, R: 54, D: 2)
Я (Вася)(L: 40, R: 45, D: 3)
Сын Даня(L: 41, R: 42, D: 4)
Дочь София(L: 43, R: 44, D: 4)
Сестра Аня(L: 46, R: 49, D: 3)
Племянник Кирюша(L: 47, R: 48, D: 4)
Брат Коля(L: 50, R: 53, D: 3)
Племянница Мила(L: 51, R: 52, D: 4)
Тетя Ира(L: 55, R: 60, D: 2)
Кузен Дима(L: 56, R: 57, D: 3)
Кузина Лена(L: 58, R: 59, D: 3)
Тетя Наташа(L: 61, R: 66, D: 2)
Кузина Света(L: 62, R: 63, D: 3)
Кузен Саша(L: 64, R: 65, D: 3)
Дядя Игорь(L: 67, R: 72, D: 2)
Кузен Андрей(L: 68, R: 69, D: 3)
Кузен Петр(L: 70, R: 71, D: 3)
Дядя Кирилл(L: 73, R: 80, D: 2)
Кузина Катя(L: 74, R: 75, D: 3)
Кузен Женя(L: 76, R: 77, D: 3)
Кузен Максим(L: 78, R: 79, D: 3)

BASE:
[
{ id: 1, name: "Прадед Гриша", parentId: null },

{ id: 2, name: "Дед Вася", parentId: 1 },
{ id: 3, name: "Бабка Маша", parentId: 1 },

{ id: 5, name: "Тетя Таня", parentId: 2 },
{ id: 6, name: "Дядя Вадик", parentId: 2 },

{ id: 28, name: "Кузен Рома", parentId: 5 },
{ id: 29, name: "Кузина Вика", parentId: 5 },
]

buildTree():
[
{
id: 1,
name: "Прадед Гриша",
parentId: null,
children: [
{
id: 2,
name: "Дед Вася",
parentId: 1,
children: [
{
id: 5,
name: "Тетя Таня",
parentId: 2,
children: [
{
id: 28,
name: "Кузен Рома",
parentId: 5,
children: []
},
{
id: 29,
name: "Кузина Вика",
parentId: 5,
children: []
}
]
},
{
id: 6,
name: "Дядя Вадик",
parentId: 2,
children: []
}
]
},
{
id: 3,
name: "Бабка Маша",
parentId: 1,
children: []
}
]
}
]

assignNestedSet():

Прадед Гриша
left = 1
right = 14
depth = 0

Дед Вася
left = 2
right = 11
depth = 1
...

flattenTree():
[
{ id: 1, left: 1, right: 14, depth: 0 },
{ id: 2, left: 2, right: 11, depth: 1 },
{ id: 5, left: 3, right: 8, depth: 2 },
{ id: 28, left: 4, right: 5, depth: 3 },
{ id: 29, left: 6, right: 7, depth: 3 },
{ id: 6, left: 9, right: 10, depth: 2 },
{ id: 3, left: 12, right: 13, depth: 1 }
]
