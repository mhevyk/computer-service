import { RouteObject } from "react-router-dom";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ChooseComputerType } from "../pages/ChooseComputerType";
import { FactoryComputers } from "../pages/FactoryComputers";

export const appRoutes: RouteObject[] = [
  {
    index: true,
    element: <ChooseComputerType />,
  },
  {
    path: "computers",
    children: [
      {
        index: true,
        element: <ChooseComputerType />,
      },
      {
        path: "factory",
        element: <FactoryComputers />,
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];
