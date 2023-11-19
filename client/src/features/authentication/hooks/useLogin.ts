import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { QUERY_KEY } from "../../../constants/queryKeys";
import { AuthResponse, LoginCredentials } from "../types/auth";
import { AxiosError, AxiosResponse } from "axios";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation<
    AxiosResponse<AuthResponse>,
    AxiosError,
    LoginCredentials
  >({
    mutationFn: ({ username, password }) => {
      return AuthService.login(username, password);
    },
    onSuccess: response => {
      queryClient.setQueryData([QUERY_KEY.user], response.data);
      navigate("/dashboard");
    },
    onError: error => {
      // TODO: handle error with toast or using aother method
      console.log("Login error", error);
    },
  });

  return mutateAsync;
}
