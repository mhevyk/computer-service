import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { QUERY_KEY } from "@constants/queryKeys";
import AuthService from "../services/AuthService";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSignOut = useCallback(async () => {
    await AuthService.logout();
    queryClient.setQueryData([QUERY_KEY.user], null);
    navigate("/auth");
  }, [navigate, queryClient]);

  return onSignOut;
}
