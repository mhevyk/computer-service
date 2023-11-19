import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { ErrorPage } from "./pages/ErrorPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LoginPage } from "./pages/Auth/LoginPage";
import { RegistrationPage } from "./pages/Auth/RegistrationPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardPage } from "./pages/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="auth" /> },
          {
            path: "auth",
            children: [
              { index: true, element: <Navigate to="login" /> },
              { path: "login", element: <LoginPage /> },
              { path: "registration", element: <RegistrationPage /> },
            ],
          },
          {
            path: "/dashboard",
            element: (
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            ),
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
