import { RouteObject } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const appRoutes: RouteObject[] = [
  {
    index: true,
    element: <DashboardPage />,
  },
  { path: "*", element: <NotFoundPage /> },
];
