import { Navigate } from "react-router-dom";
import { useUser } from "../features/authentication/hooks/useUser";
import { PropsWithChildren } from "react";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const user = useUser();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
