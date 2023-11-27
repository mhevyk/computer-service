import { RouteObject } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ComputersPage } from "../pages/ComputersPage";

export const appRoutes: RouteObject[] = [
  {
    index: true,
    element: <DashboardPage />,
  },
  {
    path: "computers",
    children: [
      {
        index: true,
        element: <ComputersPage />,
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];
