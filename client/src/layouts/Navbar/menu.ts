export type MenuItem = {
  label: string;
  path: string;
  children?: MenuItem[];
};

export const menu: MenuItem[] = [
  {
    label: "Комп'ютери",
    path: "computers",
    children: [
      {
        label: "Готові моделі",
        path: "factory",
        children: [{ label: "item", path: "" }],
      },
      {
        label: "Скласти самостійно",
        path: "custom",
      },
    ],
  },
  {
    label: "Замовлення",
    path: "orders",
  },
];
