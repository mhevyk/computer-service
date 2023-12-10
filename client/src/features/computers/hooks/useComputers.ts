import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@constants/queryKeys";
import ComputerService from "../services/ComputerService";
import { AxiosError } from "axios";
import { Computer } from "../types";

export function useComputers() {
  const { data } = useQuery<Computer[], AxiosError>({
    queryKey: [QUERY_KEY.computers],
    queryFn: async () => {
      return ComputerService.getComputers().then(response => response.data);
    },
  });

  return data;
}
