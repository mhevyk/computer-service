import { Navigate, RouteObject } from "react-router-dom";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ChooseComputerType } from "../pages/ChooseComputerType";
import { FactoryComputers } from "../pages/FactoryComputers";
import { ComputerDetails } from "../pages/FactoryComputers/components/ComputerDetails";

export const appRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="computers" />,
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
        children: [
          { index: true, element: <FactoryComputers /> },
          { path: ":computerId", element: <ComputerDetails /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];
