import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { QUERY_KEY } from "../constants/queryKeys";
import { AuthResponse, RegisrationCredentials } from "../types/auth";
import { AxiosError, AxiosResponse } from "axios";

export function useRegistration() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation<
    AxiosResponse<AuthResponse>,
    AxiosError,
    RegisrationCredentials
  >({
    mutationFn: ({ username, password }) => {
      return AuthService.registration(username, password);
    },
    onSuccess: response => {
      queryClient.setQueryData([QUERY_KEY.user], response.data);
      navigate("/dashboard");
    },
    onError: error => {
      // TODO: handle error with toast or using aother method
      console.log("Registration error", error);
    },
  });

  return mutateAsync;
}
