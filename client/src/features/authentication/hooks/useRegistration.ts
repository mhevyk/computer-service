import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { QUERY_KEY } from "@constants/queryKeys";
import { AuthResponse, RegisrationCredentials } from "../types/auth";
import { AxiosError, AxiosResponse } from "axios";
import { APIError } from "@types";
import { useSnackbar } from "notistack";
import { extractErrorMessage } from "@utils/extractErrorMessage";

export function useRegistration() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync, ...rest } = useMutation<
    AxiosResponse<AuthResponse>,
    AxiosError<APIError>,
    RegisrationCredentials
  >({
    mutationFn: ({ username, password }) => {
      return AuthService.registration(username, password);
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
