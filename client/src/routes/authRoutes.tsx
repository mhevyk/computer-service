import { Navigate, RouteObject } from "react-router-dom";
import { LoginPage } from "../pages/Auth/LoginPage";
import { RegistrationPage } from "../pages/Auth/RegistrationPage";

export const authRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="login" />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "registration",
    element: <RegistrationPage />,
  },
];
