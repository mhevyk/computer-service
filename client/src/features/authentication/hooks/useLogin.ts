import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { QUERY_KEY } from "@constants/queryKeys";
import { AuthResponse, LoginCredentials } from "../types/auth";
import { AxiosError, AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import { APIError } from "@types";
import { extractErrorMessage } from "@utils/extractErrorMessage";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync, ...rest } = useMutation<
    AxiosResponse<AuthResponse>,
    AxiosError<APIError>,
    LoginCredentials
  >({
    mutationFn: ({ username, password }) => {
      return AuthService.login(username, password);
    },
    onSuccess: response => {
      queryClient.setQueryData([QUERY_KEY.user], response.data);
      navigate("/app");
    },
    onError: error => {
      enqueueSnackbar(extractErrorMessage(error), { variant: "error" });
    },
  });

  return [mutateAsync, rest] as const;
}
