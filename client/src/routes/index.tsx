import { Navigate, createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../pages/ErrorPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { authRoutes } from "./authRoutes";
import { RootLayout } from "../layouts/RootLayout";
import { appRoutes } from "./appRoutes";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="app" /> },
          {
            path: "app",
            element: (
              <ProtectedRoute>
                <RootLayout />
              </ProtectedRoute>
            ),
            children: appRoutes,
          },
          { path: "auth", children: authRoutes },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
