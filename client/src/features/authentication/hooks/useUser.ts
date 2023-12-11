import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { QUERY_KEY } from "@constants/queryKeys";
import { AuthResponse } from "../types/auth";
import AuthService from "../services/AuthService";
import { AxiosError } from "axios";
import UserStoreService from "../services/UserStoreService";

export function useUser() {
  const { data: response, isError } = useQuery<
    unknown,
    AxiosError,
    AuthResponse
  >({
    queryKey: [QUERY_KEY.user],
    queryFn: async () => {
      return AuthService.refresh().then(response => response.data);
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: UserStoreService.getValue,
    gcTime: 3e5, // caching time = 5 minutes
  });

  useEffect(() => {
    if (!response || isError) {
      UserStoreService.deleteValue();
    } else {
      UserStoreService.saveValue(response);
    }
  }, [response, isError]);

  return response?.user ?? null;
}
